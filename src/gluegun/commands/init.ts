import { GluegunToolbox } from 'gluegun';
import { Generator } from '../../main/Generator';
import { SidiConfig } from '../../main/SidiConfig';
import Translator from '../../translations/Translator';
import { checkNewVersion } from '../../utils/Version';
import { requestWorkflow } from '../../main/PrepareWorkflows';
import iosProjectType from '../../customChecks/IOSProjectType';
import { print, printSeparator } from '../../utils/Printer';
import autoDetectProjectType from '../../customChecks/AutoDetect';
import { requestStack } from '../../editors/requests';
import checkCustomSteps from '../../customChecks/CustomSteps';

module.exports = {
  name: 'init',
  alias: ['i'],
  description: Translator.translate('commandDescription.init'),
  run: async (toolbox: GluegunToolbox) => {
    const { selectExtension } = toolbox;
    let sidiConfig = new SidiConfig();

    await checkNewVersion(toolbox);

    let useAutoDetection = false;
    const autoDetect = await autoDetectProjectType(toolbox);
    if (autoDetect) {
      printSeparator(toolbox, Translator.translate('autoDetect.title'));
      print(
        toolbox,
        Translator.translate('autoDetect.result', {
          projectType: autoDetect.projectType,
        })
      );
      useAutoDetection = await toolbox.prompt.confirm(Translator.translate('autoDetect.useAutoDetection'));
    }

    if (useAutoDetection) {
      sidiConfig.projectType = autoDetect.projectType;
    } else {
      sidiConfig.projectType = await selectExtension(Translator.translate('sidiConfig.projectType'), [
        'ios',
        'android',
        'react-native',
      ]);
    }

    sidiConfig.cicd = await selectExtension(Translator.translate('sidiConfig.whichCICD'), ['bitrise', 'codemagic']);

    if (!checkCustomSteps(toolbox, sidiConfig.cicd)) {
      print(toolbox, Translator.translate('error.customStep.title'), 'error');
      return;
    }

    if (sidiConfig.cicd === 'bitrise') {
      sidiConfig.setStackToUse(await requestStack(toolbox, sidiConfig.cicd));
    }

    sidiConfig.hasVersionedBranches = await selectExtension(Translator.translate('sidiConfig.hasVersionedBranches'), [
      'true',
      'false',
    ]);

    sidiConfig.repositoryManager = await selectExtension(Translator.translate('sidiConfig.repositoryManager'), [
      'gitlab',
      'github',
      'other',
    ]);

    if (sidiConfig.projectType != 'android') {
      sidiConfig.iosExecutableType = await iosProjectType();
    }

    sidiConfig = await requestWorkflow(toolbox, sidiConfig);
    await Generator(toolbox, sidiConfig);
  },
};
