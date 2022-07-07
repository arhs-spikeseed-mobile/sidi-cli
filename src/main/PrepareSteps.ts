import { IPreparedSteps } from '../models/SidiModel';
import { PURPOSED_STEPS_PATH } from '../Constants';
import { GluegunToolbox } from 'gluegun';
import { SidiConfig } from '../main/SidiConfig';
import { printSeparator } from '../utils/Printer';
import Translator from '../translations/Translator';
import { getConfigFiles } from '../utils/FileHelpers';
import { requestStack } from '../editors/requests';

/**
  Will check each workflow, and inject all required things
    - mandatory steps to each workflow
    - based on steps choose by user it will inject:
      - mandatory keys
      - steps linked to the chosen step
    - requets custom steps
    - set global steps
    - prepare keys to generate the secret file at the end
 */
export async function prepareSteps(toolbox: GluegunToolbox, sidiConfig: SidiConfig): Promise<IPreparedSteps> {
  printSeparator(toolbox, Translator.translate('sidiConfig.started'));

  // Will add all selected steps in current workflow based on user input
  for (const workflowName in sidiConfig._workflowConfigs) {
    sidiConfig._workflowConfigs[workflowName].cleanSteps();
    printSeparator(toolbox, Translator.translate('sidiConfig.configuring', { workflowName: workflowName }));

    await sidiConfig.setMandatorySteps(toolbox, workflowName);

    for (const stepName of sidiConfig._workflowConfigs[workflowName].requestedStepsNames) {
      const purposedStepConfigs = getConfigFiles(PURPOSED_STEPS_PATH, stepName);

      // Prepare list of steps for the current workflow based on selected steps
      await sidiConfig.setWorkflowSteps(toolbox, workflowName, purposedStepConfigs.stepConfigFile);

      // Check files to be sure if we can use step (ex AndroidManifest keys)
      if (purposedStepConfigs.stepConfigFile.checks && sidiConfig.sidiMode.mode === 'init')
        await sidiConfig.requiredStepChecks(workflowName, purposedStepConfigs.stepConfigFile.checks, toolbox);
    }

    if (
      sidiConfig.sidiMode.mode === 'init' ||
      (sidiConfig.sidiMode.mode === 'edit' && sidiConfig.sidiMode.workflowName === workflowName)
    ) {
      // Will request only if user init project or edit the workflow via edit command
      await sidiConfig.requestCustomSteps(toolbox, workflowName);

      if (sidiConfig.cicd === 'codemagic') await sidiConfig.requestPublishingCustomSteps(toolbox, workflowName);
    }
    sidiConfig.setCustomSteps(toolbox, workflowName);

    // Machine used in workflow
    if (!sidiConfig._workflowConfigs[workflowName].meta) {
      const stack = await requestStack(toolbox, sidiConfig.cicd);
      sidiConfig.setWorkflowStack(workflowName, stack);
    }
  }
  sidiConfig.setGlobalSteps();
  sidiConfig.setEnvsForSecretFile();

  return {
    secretFileEnvs: sidiConfig.secretFileEnvs,
    bitriseSteps: sidiConfig.mainStepsBitrise,
    codemagicSteps: sidiConfig.mainStepsCodemagic,
    workflowConfigs: sidiConfig._workflowConfigs,
  };
}
