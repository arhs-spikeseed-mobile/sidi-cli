import { IEnv, IPreparedSteps, IBitriseWorkflow } from '../models/SidiModel';
import { SidiConfig } from '../main/SidiConfig';
import { ENCODING_FORMAT, END_FINAL_SECRET_YAML, END_FINAL_YAML, INITIAL_CONFIG_PATH } from '../Constants';
import * as JSYAML from 'yaml';
import { GluegunToolbox } from 'gluegun';
import { print } from '../utils/Printer';
import { arrayNotEmpty, objectSorter } from '../utils/Helpers';
import * as FS from 'fs';

// Object to generate the final YAML
export class BitriseYaml {
  trigger_map: Array<{ push_branch: string; workflow: string }>;
  workflows: { [key: string]: IBitriseWorkflow };
  app: { envs?: IEnv[] };
  project_type: string;
  internal_workflow_version: string;
  meta: any;

  constructor(sidiConfig: SidiConfig, preparedSteps: IPreparedSteps) {
    const globalConfigPath = `${INITIAL_CONFIG_PATH}/${sidiConfig.cicd}/config.json`;
    if (FS.existsSync(globalConfigPath)) {
      const globalKeys = require(globalConfigPath);

      if (globalKeys) {
        for (const item in globalKeys) {
          this[item] = globalKeys[item];
        }
      }
    }

    this.internal_workflow_version = sidiConfig.version;
    this.project_type = sidiConfig.projectType;
    this.trigger_map = [];
    this.meta = sidiConfig.meta;

    // Inject steps
    this.workflows = { ...objectSorter(preparedSteps.bitriseSteps) };
    // Inject workflows
    for (const workflowName in preparedSteps.workflowConfigs) {
      const workflowSetByUser = preparedSteps.workflowConfigs[workflowName];

      this.setTriggerMap(workflowName);
      this.workflows[workflowName] = {};
      this.workflows[workflowName].after_run = [...workflowSetByUser.stepsNames];
      this.workflows[workflowName].envs = this.getEnvs(workflowName, preparedSteps);
      if (workflowSetByUser.meta && workflowSetByUser.meta != 'NONE') this.workflows[workflowName].meta = {};
      this.workflows[workflowName].meta['bitrise.io'] = {};
      this.workflows[workflowName].meta['bitrise.io'].stack = workflowSetByUser.meta;
    }

    if (arrayNotEmpty(sidiConfig.appEnvs)) {
      this.app = {};
      this.app.envs = sidiConfig.appEnvs;
    }
  }

  setTriggerMap(workflowName: string) {
    this.trigger_map.push({ push_branch: `${workflowName}/*`, workflow: workflowName });
  }

  getEnvs(workflowName: string, preparedSteps: IPreparedSteps): IEnv[] {
    if (workflowName.includes('_manager')) {
      return [
        ...preparedSteps.workflowConfigs[workflowName].envs,
        { SUBWORKFLOW: workflowName.replace('_manager', '') },
      ];
    }
    return preparedSteps.workflowConfigs[workflowName].envs;
  }

  // Used in Generator.ts
  generateYAMLs(toolbox: GluegunToolbox, sidiConfig: SidiConfig, preparedSteps: IPreparedSteps) {
    const cicd = sidiConfig.cicd;

    const secretsData = {
      envs: preparedSteps.secretFileEnvs,
    };
    FS.writeFileSync(`.${cicd}${END_FINAL_SECRET_YAML}`, new JSYAML.Document(secretsData).toString(), ENCODING_FORMAT);

    // Generate final yaml
    FS.writeFileSync(`${cicd}${END_FINAL_YAML}`, new JSYAML.Document(this).toString(), ENCODING_FORMAT);

    // remove useless chars generated by yaml lib
    FS.readFile(`${cicd}${END_FINAL_YAML}`, ENCODING_FORMAT, function (err, yamlFile) {
      if (err) {
        return print(toolbox, err.message, 'error');
      }
      const result = yamlFile
        .replace(/\|[0-9]-(?<!content: \|[0-9]-)/g, '')
        .replace(/\|-(?<!content: \|-)/g, '')
        .replace(/\*ref_[0-9]/g, '')
        .replace(/>-/g, '')
        .replace(/&ref_[0-9]/g, '');

      FS.writeFile(`${cicd}${END_FINAL_YAML}`, result, ENCODING_FORMAT, function (err) {
        if (err) return print(toolbox, err.message, 'error');
      });
    });
  }
}
