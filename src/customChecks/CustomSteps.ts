import { GluegunToolbox } from 'gluegun';
import * as FS from 'fs';
import * as JSYAML from 'js-yaml';
import { CUSTOM_STEPS_PATH } from '../Constants';
import { print } from '../utils/Printer';
import Translator from '../translations/Translator';

export default function checkCustomSteps(toolbox: GluegunToolbox, cicd: 'codemagic' | 'bitrise'): boolean {
  if (!FS.existsSync(CUSTOM_STEPS_PATH) || FS.readdirSync(CUSTOM_STEPS_PATH).length === 0) {
    return true;
  }
  const { filesystem } = toolbox;
  const stepsInFolders: any[] = filesystem.inspectTree(CUSTOM_STEPS_PATH).children;

  for (const item of stepsInFolders) {
    try {
      const stepJS = JSYAML.load(FS.readFileSync(`${CUSTOM_STEPS_PATH}/${item.name}/step.yml`, 'utf8'));

      if (cicd === 'bitrise') {
        if (!stepJS || !stepJS.steps || stepJS.steps.length === 0) {
          print(
            toolbox,
            Translator.translate('error.customStep.detail', { filename: `${CUSTOM_STEPS_PATH}/${item.name}/step.yml` }),
            'error'
          );
          return false;
        }
      } else {
        if (!stepJS || !stepJS.name || !stepJS.script) {
          print(
            toolbox,
            Translator.translate('error.customStep.detail', { filename: `${CUSTOM_STEPS_PATH}/${item.name}/step.yml` }),
            'error'
          );
          return false;
        }
      }
      // console.log(doc);
    } catch (e) {
      print(
        toolbox,
        Translator.translate('error.customStep.detail', { filename: `${CUSTOM_STEPS_PATH}/${item.name}/step.yml` }),
        'error'
      );
      return false;
    }
  }
  return true;
}
