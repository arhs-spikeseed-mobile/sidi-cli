import { ICodeMagicSpecialCase, ICodeMagicWorkflow, IPreparedSteps } from '../models/SidiModel';
import { SidiConfig } from '../main/SidiConfig';
import {
  CUSTOM_STEPS_PATH,
  DEPENDENCE_STEPS_PATH,
  ENCODING_FORMAT,
  END_FINAL_SECRET_YAML_CM,
  END_FINAL_YAML,
  STEP_YAML,
} from '../Constants';
import * as FS from 'fs';
import * as JSYAML from 'yaml';
import { GluegunToolbox } from 'gluegun';
import { print } from '../utils/Printer';
import { WorkflowConfig } from '../main/WorkflowConfig';
import { arrayNotEmpty } from '../utils/Helpers';
import { appendAsync, existsAsync, readAsync, writeAsync } from '../utils/FSPromisifier';

// Object to generate the final YAML
export class CodeMagicYaml {
  // News
  scripts: any;
  workflows: { [key: string]: ICodeMagicWorkflow };

  constructor(sidiConfig: SidiConfig, preparedSteps: IPreparedSteps) {
    // Inject steps
    this.scripts = [
      ...preparedSteps.codemagicSteps.sort(function (a, b) {
        if (Object.keys(a) < Object.keys(b)) {
          return -1;
        }
        if (Object.keys(b) < Object.keys(a)) {
          return 1;
        }
        return 0;
      }),
    ];

    // Inject workflows
    this.workflows = {};
    for (const workflowName in preparedSteps.workflowConfigs) {
      const workflowSetByUser = preparedSteps.workflowConfigs[workflowName];

      this.workflows[workflowName] = {};
      this.workflows[workflowName].name = workflowName;
      this.workflows[workflowName].max_build_duration = workflowSetByUser.maxDurationTime ?? 120;
      this.workflows[workflowName].artifacts = [
        '$CM_EXPORT_DIR/*',
        '$CM_EXPORT_DIR/*.txt',
        '$CM_EXPORT_DIR/*.html',
        '$CM_EXPORT_DIR/*.md',
        ...workflowSetByUser.artifacts,
      ];
      if (workflowSetByUser.meta && workflowSetByUser.meta != 'NONE')
        this.workflows[workflowName].instance_type = workflowSetByUser.meta;

      // Configure trigger events
      if (arrayNotEmpty(workflowSetByUser.triggerPattern)) {
        if (!workflowSetByUser.triggerPattern.includes('NONE')) {
          this.workflows[workflowName].triggering = {
            events: ['push'],
            cancel_previous_builds: true,
            branch_patterns: [],
          };
          workflowSetByUser.triggerPattern.forEach((item) => {
            this.workflows[workflowName].triggering.branch_patterns.push({ pattern: item });
          });
        }
      } else {
        this.workflows[workflowName].triggering = {
          events: ['push'],
          cancel_previous_builds: true,
          branch_patterns: [
            {
              pattern: `${workflowName}/*`,
            },
          ],
        };
      }

      const cmVars = {};
      for (const env of workflowSetByUser.envs) {
        cmVars[Object.keys(env)[0]] = Object.values(env)[0];
      }
      for (const appEnv of sidiConfig.appEnvs) {
        cmVars[Object.keys(appEnv)[0]] = Object.values(appEnv)[0];
      }

      // Configure environment block
      this.workflows[workflowName].environment = {
        xcode: 13.4,
        node: 14,
        groups: ['default'],
        vars: cmVars,
      };

      if (arrayNotEmpty(workflowSetByUser.androidSigningReferenceName)) {
        this.workflows[workflowName].environment = {
          android_signing: workflowSetByUser.androidSigningReferenceName,
          ...this.workflows[workflowName].environment,
        };
      }

      const allSteps = [...workflowSetByUser.stepsNames];
      // We add <> because * is a special char in YAML universe
      // https://yaml.org/spec/1.2-old/spec.html#id2774228
      // yaml library added automatically quotes arround the string otherwise
      this.workflows[workflowName].scripts = allSteps.map((item) => '<*>' + item);

      this.workflows[workflowName].publishing = this.getWorkflowPublishingBlock(workflowSetByUser);

      if (arrayNotEmpty(workflowSetByUser.publishingCustomSteps)) {
        workflowSetByUser.publishingCustomSteps.forEach((item) => {
          const customPath = `${CUSTOM_STEPS_PATH}/${item.stepName}/${STEP_YAML}`;
          const step = { '': FS.readFileSync(customPath, ENCODING_FORMAT) };
          if (!this.workflows[workflowName].publishing.scripts) {
            this.workflows[workflowName].publishing.scripts = [step];
          } else {
            this.workflows[workflowName].publishing.scripts.push(step);
          }
        });
      }

      if (arrayNotEmpty(workflowSetByUser.codemagicPublishingSteps)) {
        workflowSetByUser.codemagicPublishingSteps.forEach((item) => {
          const stepPath = `${DEPENDENCE_STEPS_PATH}/${item}/${sidiConfig.cicd}/${STEP_YAML}`;
          const step = { '': FS.readFileSync(stepPath, ENCODING_FORMAT) };
          if (!arrayNotEmpty(this.workflows[workflowName].publishing.scripts)) {
            this.workflows[workflowName].publishing.scripts = [step];
          } else {
            this.workflows[workflowName].publishing.scripts.push(step);
          }
        });
      }
    }
  }

  getWorkflowPublishingBlock(workflowConfig: WorkflowConfig) {
    let result;
    if (
      arrayNotEmpty(workflowConfig.codemagicSpecialCases) ||
      arrayNotEmpty(workflowConfig.publishingCustomSteps) ||
      arrayNotEmpty(workflowConfig.codemagicPublishingSteps)
    ) {
      result = {};
    }
    if (arrayNotEmpty(workflowConfig.codemagicSpecialCases)) {
      workflowConfig.codemagicSpecialCases.forEach((item: ICodeMagicSpecialCase) => {
        const stepFile = FS.readFileSync(
          `${DEPENDENCE_STEPS_PATH}/${item.stepName}/${workflowConfig.cicd}/${STEP_YAML}`,
          ENCODING_FORMAT
        );
        if (item.stepName.includes('firebase')) {
          if (!result.firebase) {
            result.firebase = {
              firebase_token: '$FIREBASE_TOKEN',
            };
          }
        }

        switch (item.stepName) {
          case '_deploy_to_firebase_android':
            result.firebase.android = stepFile;
            break;
          case '_deploy_to_firebase_ios':
            result.firebase.ios = stepFile;
            break;
          case '_deploy_to_itunes':
            result.app_store_connect = stepFile;
            break;
          case '_deploy_to_play_store':
            result.google_play = stepFile;
            break;
          case '_send_slack_message':
            result.slack = stepFile;
            break;
          default:
            break;
        }
      });
    }
    return result;
  }

  async generateYAMLs(toolbox: GluegunToolbox, sidiConfig: SidiConfig, preparedSteps: IPreparedSteps) {
    const cicd = sidiConfig.cicd;

    const secretFileName = `.${cicd}${END_FINAL_SECRET_YAML_CM}`;

    const secretFileExist = await existsAsync(secretFileName);
    if (!secretFileExist) {
      await writeAsync(secretFileName, '', ENCODING_FORMAT);
    }

    const contents = await readAsync(secretFileName, ENCODING_FORMAT);
    for (const secretItem of preparedSteps.secretFileEnvs) {
      if (!contents.includes(`${Object.keys(secretItem)[0]}=`)) {
        await appendAsync(
          secretFileName,
          `${Object.keys(secretItem)[0]}=${Object.values(secretItem)[0]}\n`,
          ENCODING_FORMAT
        );
      }
    }

    // Generate final yaml
    const finalFile = new JSYAML.Document(this);
    finalFile.commentBefore =
      'Generated with SIDI3.0\nDocumentation can be found\n Here: https://github.com/imranMnts/sidi-cli/blob/master/docs/versionedBranches.md';
    FS.writeFileSync(`${cicd}${END_FINAL_YAML}`, finalFile.toString({ lineWidth: 1500 }), ENCODING_FORMAT);

    // remove useless chars generated by yaml lib
    FS.readFile(`${cicd}${END_FINAL_YAML}`, ENCODING_FORMAT, function (err, yamlFile) {
      if (err) {
        return print(toolbox, err.message, 'error');
      }

      // Remove useless char due to conversion
      let result = yamlFile
        .replace(/\|[0-9]-(?<!content: \|[0-9]-)/g, '')
        .replace(/\|-(?<!content: \|-)/g, '')
        .replace(/\*ref_[0-9]/g, '')
        .replace(/>-/g, '')
        .replace(/"": \n {10}/g, '')
        .replace(/&ref_[0-9]/g, '');

      // Remove delimitator for YAML special chars (* or &)
      result = result.replace(/<&>/g, '&').replace(/<&&>:/g, '').replace(/<\*>/g, '*');

      FS.writeFile(`${cicd}${END_FINAL_YAML}`, result, ENCODING_FORMAT, function (err) {
        if (err) return print(toolbox, err.message, 'error');
      });
    });
  }
}
