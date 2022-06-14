import { IPreparedSteps } from '../models/SidiModel';
import { GluegunToolbox } from 'gluegun';
import * as FS from 'fs';
import { SidiConfig } from '../main/SidiConfig';
import { BitriseYaml } from '../cicd/BitriseYaml';
import { ENCODING_FORMAT, END_FINAL_SECRET_YAML, END_FINAL_YAML } from '../Constants';
import { print, printSeparator } from '../utils/Printer';
import Translator from '../translations/Translator';
import { checkIfProperlyCreated, sidiConfigKeyReplacer, sleep } from '../utils/Helpers';
import { prepareSteps } from './PrepareSteps';
import { CodeMagicYaml } from '../cicd/CodeMagicYaml';

// Based on the config, will generate the final YAMLs
export async function Generator(toolbox: GluegunToolbox, sidiConfig: SidiConfig) {
  const { inputExtension } = toolbox;
  const preparedSteps: IPreparedSteps = await prepareSteps(toolbox, sidiConfig);

  const cicdData =
    sidiConfig.cicd === 'bitrise'
      ? new BitriseYaml(sidiConfig, preparedSteps)
      : new CodeMagicYaml(sidiConfig, preparedSteps);
  await cicdData.generateYAMLs(toolbox, sidiConfig, preparedSteps);

  printSeparator(toolbox, Translator.translate('end.title'));

  if (checkIfProperlyCreated(sidiConfig, cicdData.workflows)) {
    print(
      toolbox,
      Translator.translate('end.success', {
        cicd: sidiConfig.cicd,
        endYaml: END_FINAL_YAML,
        endSecretYaml: END_FINAL_SECRET_YAML,
      }),
      'success'
    );
    print(toolbox, Translator.translate('end.helper'));
  } else {
    print(toolbox, Translator.translate('end.failure'), 'error');
  }

  while (!FS.existsSync('.sidi/')) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    FS.mkdir('.sidi', async function (err) {
      if (err) {
        return await inputExtension('sidiConfigSave', Translator.translate('error.sidiConfigSave'));
      }
      return true;
    });
    await sleep(1000);
  }

  FS.writeFileSync(`.sidi/sidiConfig.json`, JSON.stringify(sidiConfig, sidiConfigKeyReplacer, 2), ENCODING_FORMAT);
}
