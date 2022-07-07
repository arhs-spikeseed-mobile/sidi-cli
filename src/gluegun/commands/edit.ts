import { GluegunToolbox } from 'gluegun';
import { Generator } from '../../main/Generator';
import * as FS from 'fs';
import { SidiConfig } from '../../main/SidiConfig';
import { ENCODING_FORMAT } from '../../Constants';
import { print } from '../../utils/Printer';
import Translator from '../../translations/Translator';
import { checkNewVersion } from '../../utils/Version';
import { findFileInProject } from '../../utils/FileHelpers';
import { userEditWorkflow } from '../../editors/editManager';
import checkCustomSteps from '../../customChecks/CustomSteps';

module.exports = {
  name: 'edit',
  alias: ['e'],
  description: Translator.translate('commandDescription.edit'),
  run: async (toolbox: GluegunToolbox) => {
    await checkNewVersion(toolbox);

    const sidiConfigPath = await findFileInProject(toolbox, 'sidiConfig');
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    FS.readFile(sidiConfigPath, ENCODING_FORMAT, async function (err, sidiConfigFile) {
      try {
        let sidiConfig = new SidiConfig(JSON.parse(sidiConfigFile));
        sidiConfig.changeSidiMode({ mode: 'edit' });
        sidiConfig = await userEditWorkflow(toolbox, sidiConfig);

        if (!checkCustomSteps(toolbox, sidiConfig.cicd)) {
          print(toolbox, Translator.translate('error.customStep.title'), 'error');
          return;
        }

        await Generator(toolbox, sidiConfig);
      } catch (e) {
        print(toolbox, e, 'error');
      }
    });
  },
};
