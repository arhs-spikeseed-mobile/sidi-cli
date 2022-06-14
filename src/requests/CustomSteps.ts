import { GluegunToolbox } from 'gluegun';
import * as FS from 'fs';
import { CUSTOM_STEPS_PATH } from '../Constants';
import { print, printableSteps, printSeparator } from '../utils/Printer';
import { getPrintableStepsFromArray, getPrintableStepsFromFolder } from '../utils/Helpers';
import { IPrintableStep } from '../models/SidiModel';
import { WorkflowConfig } from '../main/WorkflowConfig';
import Translator from '../translations/Translator';

/**
   Request to user if want to inject any custom steps
   These steps should be placed into .sidi/customSteps/xxx/step.yml

   @param toolbox: GluegunToolbox
   @param workflowConfig: workflow it will add custom steps
   @param isPublishingStep to know if the custom step is for the build or for the publishing section
 */
export async function requestCustomSteps(
  toolbox: GluegunToolbox,
  workflowConfig: WorkflowConfig,
  isPublishingStep = false
): Promise<WorkflowConfig> {
  const { prompt, inputExtension } = toolbox;
  if (FS.existsSync(CUSTOM_STEPS_PATH) && FS.readdirSync(CUSTOM_STEPS_PATH).length > 0) {
    printSeparator(toolbox, Translator.translate('checker.customSteps.title'));

    let listKey: 'customSteps' | 'publishingCustomSteps' = 'customSteps';
    let requestTranlationKey = 'sidiConfig.newCustomStep';
    if (isPublishingStep) {
      requestTranlationKey = 'sidiConfig.newPublishingCustomStep';
      listKey = 'publishingCustomSteps';
    }

    while (await prompt.confirm(Translator.translate(requestTranlationKey, { workflowName: workflowConfig.name }))) {
      const customStepsPrintable: IPrintableStep[] = getPrintableStepsFromFolder(toolbox, CUSTOM_STEPS_PATH);

      let selectedStep;
      while (!selectedStep) {
        const idSelected = await inputExtension(
          '_id',
          Translator.translate('workflow.newWorkflow.step', { printableSteps: printableSteps(customStepsPrintable) })
        );
        selectedStep = customStepsPrintable.find(
          (item) => `${item.id}` === idSelected || `${item.name}` === idSelected
        );
      }
      print(toolbox, `${Translator.translate(`checker.${listKey}.selectedStep`)} ${selectedStep.name}`);

      let destinationId;
      let selectedDestinationStep;
      const workflowStepsPrintable = getPrintableStepsFromArray(toolbox, workflowConfig.stepsNames);
      if (listKey === 'customSteps' && workflowStepsPrintable && workflowStepsPrintable.length > 0) {
        destinationId = await inputExtension(
          '_id',
          Translator.translate(`checker.${listKey}.whereInsert`, {
            printableSteps: printableSteps(workflowStepsPrintable),
          })
        );
        selectedDestinationStep = workflowStepsPrintable.find(
          (item) => `${item.id}` === destinationId || `${item.name}` === destinationId
        );
      }

      if (!workflowConfig[listKey]) {
        workflowConfig[listKey] = [];
      }
      if (!selectedDestinationStep) {
        workflowConfig[listKey].push({ stepName: selectedStep.name });
      } else {
        workflowConfig[listKey].push({ stepName: selectedStep.name, nextStepName: selectedDestinationStep.name });
      }
    }
  } else {
    print(toolbox, Translator.translate('checker.customSteps.notFound'));
  }
  return workflowConfig;
}
