import { GluegunToolbox } from 'gluegun';
import * as FS from 'fs';
import { Generator } from '../../main/Generator';
import { findFileInProject } from '../../utils/FileHelpers';
import { SidiConfig } from '../../main/SidiConfig';
import { ENCODING_FORMAT } from '../../Constants';
import { print, printSeparator } from '../../utils/Printer';
import { checkNewVersion } from '../../utils/Version';
import Translator from '../../translations/Translator';
import checkCustomSteps from '../../customChecks/CustomSteps';

module.exports = {
  name: 'update',
  alias: ['u'],
  description: Translator.translate('commandDescription.update'),
  run: async (toolbox: GluegunToolbox) => {
    await checkNewVersion(toolbox);

    printSeparator(toolbox, Translator.translate('sidiConfig.searchConfig'));

    const sidiConfigPath = await findFileInProject(toolbox, 'sidiConfig');
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    FS.readFile(sidiConfigPath, ENCODING_FORMAT, async function (err, sidiConfigFile) {
      try {
        const sidiConfig = new SidiConfig(JSON.parse(sidiConfigFile));

        if (!checkCustomSteps(toolbox, sidiConfig.cicd)) {
          print(toolbox, Translator.translate('error.customStep.title'), 'error');
          return;
        }

        sidiConfig.changeSidiMode({ mode: 'update' });
        await Generator(toolbox, sidiConfig);
      } catch (e) {
        print(toolbox, e, 'error');
      }
    });
  },
};
