import { ICheck, IConfig, IEnv, ISidiMode, IStep } from '../models/SidiModel';
import { WorkflowConfig } from './WorkflowConfig';
import { GluegunToolbox } from 'gluegun';
import {
  CUSTOM_STEPS_PATH,
  DEPENDENCE_STEPS_PATH,
  ENCODING_FORMAT,
  MANDATORY_STEPS_PATH,
  STEP_YAML,
} from '../Constants';
import * as FS from 'fs';
import Translator from '../translations/Translator';
import { purposeStepsToWorkflow } from '../utils/PurposeStep';
import { arrayNotEmpty, checkIfArrayContainKey } from '../utils/Helpers';
import { getConfigFiles } from '../utils/FileHelpers';
import { print } from '../utils/Printer';

// keys to not retrieve when user launch update command
export const sidiConfigUnwantedKeys = [
  'mainStepsCodemagic',
  'mainStepsBitrise',
  'secretFileEnvs',
  'sidiMode',
  'appEnvs',
];

export class SidiConfig {
  version: string;
  projectType: 'ios' | 'android' | 'react-native' | 'flutter';
  appOrLib: 'app' | 'library';
  cicd: 'bitrise' | 'codemagic';
  libOrApp: 'library' | 'application';
  hasVersionedBranches: 'true' | 'false';
  repositoryManager: 'gitlab' | 'github' | 'other';
  updateGitStatus: 'true' | 'false';
  iosExecutableType: 'xcworkspace' | 'xcodeproj';
  sidiMode: ISidiMode;
  // Stack/machine used for the workflow
  meta: any;

  // DO NOT CHANGE FORMAT/TYPE
  // Variables used to construct final yaml
  appEnvs?: IEnv[]; // For bitrise's global envs (used only Bitrise)
  mainStepsBitrise: IStep;
  mainStepsCodemagic: Array<IStep>;
  secretFileEnvs: IEnv[]; // List of all envs need to be set by user -> will be in final secret file
  _workflowConfigs: { [key: string]: WorkflowConfig };

  constructor(sidiConfig?: SidiConfig) {
    require('pkginfo')(module, 'version');
    this.version = module.exports.version;
    this.mainStepsBitrise = {};
    this.mainStepsCodemagic = [];
    this._workflowConfigs = {};
    this.secretFileEnvs = [];
    this.appEnvs = [];
    this.sidiMode = { mode: 'init' };

    // update/edit scenario
    if (sidiConfig) {
      for (const key in sidiConfig) {
        if (key.includes('_workflowConfigs')) {
          if (key === '_workflowConfigs') {
            for (const workflowName in sidiConfig._workflowConfigs) {
              this.addNewWorkflow(sidiConfig._workflowConfigs[workflowName]);
            }
          }
        } else {
          this[key] = sidiConfig[key];
        }
      }
    }
  }

  /**
    Set the machine to use on cicd side
  */
  setStackToUse(meta: any) {
    this.meta = meta;
  }

  /**
    To change used cicd
  */
  changeCICD(cicd: 'bitrise' | 'codemagic') {
    this.cicd = cicd;
    if (this._workflowConfigs) {
      for (const workflow in this._workflowConfigs) {
        this._workflowConfigs[workflow].cicd = cicd;
      }
    }
  }

  /**
    Add a new workflow, instantiated with the name only or with a existing config from sidiConfig.json
   */
  addNewWorkflow(workflowConfig: WorkflowConfig) {
    const workflow = new WorkflowConfig(this.cicd, workflowConfig);
    if (this.sidiMode.mode === 'edit') {
      // to regenerate them in duplication scenarios
      workflow.envs = [];
      workflow.requiredKeys = [];
    }
    this._workflowConfigs[workflowConfig.name] = new WorkflowConfig(this.cicd, workflow);
  }

  /**
    Delete a workflow

    @param workflowName: workflow's name
   */
  deleteWorkflow(workflowName: string) {
    delete this._workflowConfigs[workflowName];
  }

  /**
    Update the mode - default init

    @param mode: sidi's mode, to know which process to launch in PrepareSteps
   */
  changeSidiMode(mode: ISidiMode) {
    this.sidiMode = mode;
    if (mode.mode === 'update') {
      for (const workflow in this._workflowConfigs) {
        // clean stepNames to retrieve again from purposed folder to add last ones
        this._workflowConfigs[workflow].cleanSteps();
      }
    }
  }

  /**
    Delete a workflow
   */
  async updateWorkflow(toolbox: GluegunToolbox, workflowName: string) {
    this._workflowConfigs[workflowName] = await purposeStepsToWorkflow(toolbox, this._workflowConfigs[workflowName]);
  }

  /**
    Set workflow's steps based on mandatorySteps or (selected) purposedSteps contents
   - check if the step has any condition
     - if yes ask input to user (only if the condition object contain "choices" object)
     - if condition false -> not added to the workflows

    @param toolbox: GluegunToolbox
    @param workflowName: workflow's name where it will add steps
    @param configFile: config file of the step
   */
  async setWorkflowSteps(toolbox: GluegunToolbox, workflowName: string, configFile: IConfig) {
    for (const stepName of configFile.stepsFamily) {
      const dependenceYamlPath = `${DEPENDENCE_STEPS_PATH}/${stepName}/${this.cicd}/${STEP_YAML}`;
      if (!FS.existsSync(dependenceYamlPath)) {
        print(toolbox, `${stepName} not found for ${this.cicd}, let's continue to the next step..`, 'warning');
        continue;
      }

      // Check if parent step has condition and if array contain stepName
      if (arrayNotEmpty(configFile.conditionalSteps)) {
        const stepCondition = configFile.conditionalSteps.find((item) => item.stepsNames.includes(stepName));
        if (!stepCondition) {
          this._workflowConfigs[workflowName].addStep(stepName);
          continue;
        }
        await this._workflowConfigs[workflowName].checkConditionsAddStep(
          toolbox,
          stepCondition.conditions,
          stepName,
          this
        );
      } else {
        this._workflowConfigs[workflowName].addStep(stepName);
      }
    }
    if (arrayNotEmpty(configFile.publishingSteps)) {
      for (const stepName of configFile.publishingSteps) {
        const dependenceYamlPath = `${DEPENDENCE_STEPS_PATH}/${stepName}/${this.cicd}/${STEP_YAML}`;
        if (!FS.existsSync(dependenceYamlPath)) {
          print(toolbox, `${stepName} not found for ${this.cicd}, let's continue to the next step..`, 'warning');
          continue;
        }

        // Check if parent step has condition and if array contain stepName
        if (arrayNotEmpty(configFile.conditionalSteps)) {
          const stepCondition = configFile.conditionalSteps.find((item) => item.stepsNames.includes(stepName));
          if (!stepCondition) {
            this._workflowConfigs[workflowName].addStep(stepName, true);
            continue;
          }
          await this._workflowConfigs[workflowName].checkConditionsAddStep(
            toolbox,
            stepCondition.conditions,
            stepName,
            this,
            true
          );
        } else {
          this._workflowConfigs[workflowName].addStep(stepName, true);
        }
      }
    }
  }

  /**
    Ask to user if he wants to add any custom step to workflow

    @param toolbox: GluegunToolbox
    @param workflowName: workflow's name where it will add steps
   */
  async requestCustomSteps(toolbox: GluegunToolbox, workflowName: string) {
    await this._workflowConfigs[workflowName].requestCustomSteps(toolbox);
  }

  /**
    Ask to user if he wants to add any custom step to workflow's publishing step (codemagic only)

    @param toolbox: GluegunToolbox
    @param workflowName: workflow's name where it will add steps
   */
  async requestPublishingCustomSteps(toolbox: GluegunToolbox, workflowName: string) {
    await this._workflowConfigs[workflowName].requestPublishingCustomSteps(toolbox);
  }

  /**
    Ask to user if he wants to add any custom step to workflow

    @param workflowName: workflow's name where it will add steps
    @param stack: stack (machine) to use for this workflow
   */
  setWorkflowStack(workflowName: string, stack: any) {
    this._workflowConfigs[workflowName].setStackToUse(stack);
  }

  /**
    Inject custom steps into stepsNames in the correct place

    @param toolbox: GluegunToolbox
    @param workflowName: workflow's name where it will add steps
   */
  setCustomSteps(toolbox: GluegunToolbox, workflowName: string) {
    this._workflowConfigs[workflowName].setCustomSteps();
  }

  /**
   Will check if files properly set to use specific step
   Code used if we have any `checks` in config file
  */
  async requiredStepChecks(workflowName: string, checks: ICheck[], toolbox: GluegunToolbox) {
    const { selectExtension } = toolbox;
    let conditionsResult = true;

    for (const check of checks) {
      for (const condition of check.conditions) {
        if (this._workflowConfigs[workflowName][condition.key] === undefined && condition.choices) {
          this._workflowConfigs[workflowName][condition.key] = await selectExtension(
            Translator.translate(`request.${condition.key}`),
            condition.choices
          );
        }

        if (!condition.expectedValues.includes(this._workflowConfigs[workflowName][condition.key])) {
          conditionsResult = false;
          break;
        }
      }
      if (conditionsResult) {
        await check.check(toolbox);
      }
    }
  }

  /**
    Will add all mandatory steps to the workflow (mandatorySteps folder)

    @param toolbox: GluegunToolbox
    @param workflowName: workflow's name where it will add steps
  */
  async setMandatorySteps(toolbox: GluegunToolbox, workflowName: string) {
    const mandatoryStepsFolders: string[] = FS.readdirSync(MANDATORY_STEPS_PATH);
    for (const mandatoryStepName of mandatoryStepsFolders) {
      if (mandatoryStepName.startsWith('_')) {
        const mandatoryStepConfigs = getConfigFiles(MANDATORY_STEPS_PATH, mandatoryStepName);

        await this.setWorkflowSteps(toolbox, workflowName, mandatoryStepConfigs.stepConfigFile);
      }
    }
  }

  /**
    Will add all dependence steps based on purposedSteps choose for each workflow
  */
  setGlobalSteps() {
    for (const workflow in this._workflowConfigs) {
      [...this._workflowConfigs[workflow].stepsNames].forEach((stepName: string) => {
        let stepFile;
        const dependencePath = `${DEPENDENCE_STEPS_PATH}/${stepName}/${this.cicd}/${STEP_YAML}`;
        const customPath = `${CUSTOM_STEPS_PATH}/${stepName}/${STEP_YAML}`;
        if (FS.existsSync(dependencePath)) {
          //
          stepFile = FS.readFileSync(dependencePath, ENCODING_FORMAT);
        } else if (FS.existsSync(customPath)) {
          stepFile = FS.readFileSync(customPath, ENCODING_FORMAT);
        }
        // this.workflowConfig[workflow].addRequiredKeys()
        if (stepFile) {
          this.setStepsYAML(stepName, stepFile);
        }
      });
    }
  }

  // Used to construct final yaml - DO NOT CHANGE FORMAT
  setStepsYAML(stepName: string, stepFile: any) {
    this.mainStepsBitrise = { [stepName]: stepFile, ...this.mainStepsBitrise };

    // We add <> because & is a special char in YAML universe
    // https://yaml.org/spec/1.2-old/spec.html#id2774228
    // yaml library added automatically quotes arround the string otherwise
    const codemagicKey = `<&>${stepName}<&&>`;
    if (!this.mainStepsCodemagic.some((item) => Object.keys(item)[0] === codemagicKey)) {
      this.mainStepsCodemagic.push({ [codemagicKey]: stepFile });
    }
  }

  // Used to inject global envs - DO NOT CHANGE FORMAT
  addAppEnv(key: string, value: string) {
    if (!checkIfArrayContainKey(this.appEnvs, key))
      this.appEnvs.push({
        [key]: value,
      });
  }

  // Used to construct final yaml - DO NOT CHANGE FORMAT
  setEnvsForSecretFile() {
    // Prepare .secret.yml/conf & global envs
    for (const workflowName in this._workflowConfigs) {
      for (const requiredKey of this._workflowConfigs[workflowName].requiredKeys) {
        let keyName = `${requiredKey.key}`;
        let keyNameWithPrefix = `P_${keyName}`;

        if (requiredKey.globalValue) {
          this.addAppEnv(keyName, this.cicd === 'bitrise' ? `$${keyNameWithPrefix}` : `$${keyName}`);
        } else {
          keyName = `${keyName}_${workflowName.toUpperCase()}`;
          keyNameWithPrefix = `P_${keyName}`;
          this._workflowConfigs[workflowName].addEnv(
            requiredKey.key,
            this.cicd === 'bitrise' ? `$${keyNameWithPrefix}` : `$${requiredKey.key}`
          );
        }

        // check if key already added and add to
        if (!this.secretFileEnvs.some((env: IEnv) => keyNameWithPrefix in env)) {
          this.secretFileEnvs.push({
            [keyNameWithPrefix]: requiredKey.defaultValue || '',
          });
        }
      }
      // Add workflow as env
      this._workflowConfigs[workflowName].addEnv('WORKFLOW', workflowName);
      this._workflowConfigs[workflowName].addEnv('WORKFLOW_MAJ', workflowName.toUpperCase());
    }
  }
}
