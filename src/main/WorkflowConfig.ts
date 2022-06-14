import { IKey, IEnv, ICondition, IConfig, ICustomSteps, ICodeMagicSpecialCase } from '../models/SidiModel';
import { GluegunToolbox } from 'gluegun';
import { arrayNotEmpty, checkIfArrayContainKey, hasWhiteSpace } from '../utils/Helpers';
import { CONFIG_TS, DEPENDENCE_STEPS_PATH } from '../Constants';
import { SidiConfig } from './SidiConfig';
import Translator from '../translations/Translator';
import { print } from '../utils/Printer';
import * as FS from 'fs';
import { requestCustomSteps } from '../requests/CustomSteps';

// keys to not retrieve when user launch update command
export const workflowConfigUnwantedKeys = ['mandatoryStepsNames', 'requiredKeys', 'envs', 'codemagicSpecialCases'];

// object which contain all info to know about the workflow
export class WorkflowConfig {
  name: string;
  requestedStepsNames: string[]; // step choose by user (purposedSteps)
  stepsNames: string[];
  customSteps: ICustomSteps[];
  triggerPattern: string[];
  androidSigningReferenceName: string[];
  codemagicSpecialCases: ICodeMagicSpecialCase[]; // to add a step in publishing section
  publishingCustomSteps: ICustomSteps[]; // to add a custom step in publishing section

  requiredKeys?: IKey[]; // List of envs need to be set by user for this workflow -> will be in final secret file
  envs: Array<IEnv>; // List of envs which ill be set for the workflow
  artifacts: string[]; // Codemagic artifacts to export
  cicd: string;
  // Stack/machine used for the workflow
  meta: any;

  constructor(cicd: string, workflowConfig?: WorkflowConfig) {
    this.requestedStepsNames = [];
    this.requiredKeys = [];
    this.artifacts = [];
    this.envs = [];
    this.stepsNames = [];
    this.customSteps = [];
    this.codemagicSpecialCases = [];
    this.cicd = cicd;

    // update scenario
    if (workflowConfig) {
      for (const key in workflowConfig) {
        this[key] = workflowConfig[key];
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
   Ask to user if he wants to add any custom step to workflow

   @param toolbox: GluegunToolbox
   */
  async requestCustomSteps(toolbox: GluegunToolbox) {
    this.customSteps = (await requestCustomSteps(toolbox, this)).customSteps;
  }

  /**
   Ask to user if he wants to add any custom step to workflow

   @param toolbox: GluegunToolbox
   */
  async requestPublishingCustomSteps(toolbox: GluegunToolbox) {
    this.publishingCustomSteps = (await requestCustomSteps(toolbox, this, true)).publishingCustomSteps;
  }

  setNameAndCheckValidity(toolbox: GluegunToolbox, name: string): boolean {
    if (!name || hasWhiteSpace(name)) {
      print(toolbox, Translator.translate('error.badWorkflowName'));
      return false;
    }
    this.name = name;
    return true;
  }

  /**
   * Add step from purposed step
   * Array contains only items purposed in CLI
   *
   * @param stepName
   */
  addRequestedStep(stepName: string) {
    if (!this.requestedStepsNames.includes(stepName)) {
      this.requestedStepsNames.push(stepName);
    }
  }

  deleteRequestedStep(stepName: string) {
    this[stepName] = 'false'; // to not add this step
    this.stepsNames = this.stepsNames.filter((item) => item !== stepName);
  }

  deleteCustomStep(stepName: string) {
    this[stepName] = 'false'; // to not add this step
    this.customSteps = this.customSteps.filter((item) => item.stepName !== stepName);
  }

  deletePublishingCustomStep(stepName: string) {
    this[stepName] = 'false'; // to not add this step
    this.customSteps = this.publishingCustomSteps.filter((item) => item.stepName !== stepName);
  }

  setCustomTriggerPattern(pattern: string) {
    if (!arrayNotEmpty(pattern)) {
      this.triggerPattern = undefined;
    } else if (pattern.includes(',')) {
      pattern.split(',').forEach((item) => {
        const formattedItem = item.replace(/ /g, '');
        if (arrayNotEmpty(this.triggerPattern)) {
          this.triggerPattern.push(formattedItem);
        } else {
          this.triggerPattern = [formattedItem];
        }
      });
    } else {
      const formattedItem = pattern.replace(/ /g, '');
      this.triggerPattern = [formattedItem];
    }
  }

  setAndroidSigningKeystoreRef(referenceName: string) {
    if (!arrayNotEmpty(referenceName)) {
      this.androidSigningReferenceName = undefined;
    } else {
      this.androidSigningReferenceName = [referenceName];
    }
  }

  /**
   * Will add the step to the workflow after check if the step:
   *   - contain any condition
   *   - if condition not set + has choices object, it will be requested to user if he wants use the step
   *   - if condition valid, the step will be added to the workflow
   *
   * @param toolbox: GluegunToolbox
   * @param conditions: conditions to check/request to user to add or not the step
   * @param stepName: step name
   * @param sidiConfig: sidi config object
   */
  async checkConditionsAddStep(
    toolbox: GluegunToolbox,
    conditions: ICondition[],
    stepName: string,
    sidiConfig: SidiConfig
  ) {
    const { selectExtension } = toolbox;
    let addThisStep = true;
    for (const condition of conditions) {
      // Set global value to workflow
      if (sidiConfig[condition.key] != undefined && this[condition.key] === undefined) {
        this[condition.key] = sidiConfig[condition.key];
      }

      // Request to user if step has any condition & choices
      if (this[condition.key] === undefined && arrayNotEmpty(condition.choices)) {
        this[condition.key] = await selectExtension(
          Translator.translate(`request.${condition.key}`),
          condition.choices
        );
      }

      if (!condition.expectedValues.includes(this[condition.key])) {
        addThisStep = false;
        break;
      }
    }

    let stepAdded = false;
    if (addThisStep) {
      const stepConfig: IConfig = require(`${DEPENDENCE_STEPS_PATH}/${stepName}/${this.cicd}/${CONFIG_TS}`).default;
      if (stepConfig.codemagicSpecialCase) {
        this.addSpecialStep(stepConfig.codemagicSpecialCase);
        stepAdded = true;
      } else {
        stepAdded = this.addStep(stepName);
      }
    }

    if (stepAdded) {
      const stepConfig: IConfig = require(`${DEPENDENCE_STEPS_PATH}/${stepName}/${sidiConfig.cicd}/${CONFIG_TS}`)
        .default;

      // Check files to be sure if we can use step (ex AndroidManifest keys)
      if (stepConfig.checks) await sidiConfig.requiredStepChecks(this.name, stepConfig.checks, toolbox);
    }
  }

  /**
   * Will add the step to the workflow
   * to mandatory steps, to place it at the begining of build or not
   * and add required keys to set in future variables
   *
   * @param stepName step's name
   */
  addStep(stepName: string): boolean {
    let stepAdded = false;
    if (stepName && this[stepName] !== 'false') {
      const stepConfigPath = `${DEPENDENCE_STEPS_PATH}/${stepName}/${this.cicd}/${CONFIG_TS}`;

      if (!FS.existsSync(stepConfigPath)) {
        return false;
      }

      const stepConfig: IConfig = require(stepConfigPath).default;

      if (this.stepsNames.includes(stepName) && stepConfig.replaceIfDuplicate)
        this.stepsNames.splice(this.stepsNames.indexOf(stepName), 1);

      if (!this.stepsNames.includes(stepName)) {
        this.stepsNames.push(stepName);
        stepAdded = true;
      }

      this.addRequiredKeys(stepName, this.cicd);
      this.addArtifactPaths(stepName, this.cicd);
      return stepAdded;
    }
  }

  /**
   * Will add the step to a special list to add to the yaml in a special way, to have  valid yaml
   * for CodeMAgic only
   *
   * @param stepSpecialCase step's name
   */
  addSpecialStep(stepSpecialCase: ICodeMagicSpecialCase) {
    if (this[stepSpecialCase.stepName] !== 'false') {
      const stepConfigPath = `${DEPENDENCE_STEPS_PATH}/${stepSpecialCase.stepName}/${this.cicd}/${CONFIG_TS}`;

      if (!FS.existsSync(stepConfigPath)) {
        return false;
      }

      const stepConfig: IConfig = require(stepConfigPath).default;

      if (!this.codemagicSpecialCases.find((item) => item.stepName === stepSpecialCase.stepName)) {
        this.codemagicSpecialCases.push(stepConfig.codemagicSpecialCase);
        this.addRequiredKeys(stepSpecialCase.stepName, this.cicd);
      }
    }
  }

  /**
    Inject custom steps into stepsNames in the correct place
   */
  setCustomSteps() {
    if (arrayNotEmpty(this.customSteps)) {
      for (const customStep of this.customSteps) {
        if (!customStep.nextStepName) {
          this.stepsNames.push(customStep.stepName);
        } else {
          const nextStepIndex = this.stepsNames.findIndex((item) => item === customStep.nextStepName);
          if (nextStepIndex != -1) {
            this.stepsNames.splice(nextStepIndex, 0, customStep.stepName);
          } else {
            this.stepsNames.push(customStep.stepName);
          }
        }
      }
    }
  }

  /**
   * Based on mandatoryKeys object, it will inject all required keys linked to the steps to create secret yml
   */
  addRequiredKeys(stepName: string, cicd: string) {
    const stepConfig: IConfig = require(`${DEPENDENCE_STEPS_PATH}/${stepName}/${cicd}/${CONFIG_TS}`).default;
    if (arrayNotEmpty(stepConfig.mandatoryKeys)) this.requiredKeys.push(...stepConfig.mandatoryKeys);
  }

  /**
   * Based on mandatoryKeys object, it will inject all required keys linked to the steps to create secret yml
   * for Codemagic artifacts only
   */
  addArtifactPaths(stepName: string, cicd: string) {
    const stepConfig: IConfig = require(`${DEPENDENCE_STEPS_PATH}/${stepName}/${cicd}/${CONFIG_TS}`).default;
    if (arrayNotEmpty(stepConfig.artifacts)) {
      stepConfig.artifacts.forEach((artifact: string) => {
        if (!this.artifacts.includes(artifact)) this.artifacts.push(artifact);
      });
    }
  }

  /**
   * Based on mandatoryKeys object, it will inject all required keys linked to the steps to create secret yml
   */
  addEnv(key: string, value: string) {
    if (!checkIfArrayContainKey(this.envs, key))
      this.envs.push({
        [key]: value,
      });
  }

  /**
   * Clean steps to refill based on requestedStepsNames
   */
  cleanSteps() {
    this.stepsNames = [];
  }
}
