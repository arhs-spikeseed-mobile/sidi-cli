import { GluegunToolbox } from 'gluegun';
import { WorkflowConfig } from '../main/WorkflowConfig';
import { getPrintableStepsFromFolder } from './Helpers';
import { PURPOSED_STEPS_PATH } from '../Constants';
import Translator from '../translations/Translator';
import { print, printableSteps } from './Printer';
import { IPrintableStep } from '../models/SidiModel';

export async function purposeStepsToWorkflow(
  toolbox: GluegunToolbox,
  workflow: WorkflowConfig
): Promise<WorkflowConfig> {
  const { inputExtension } = toolbox;
  let addNewStep = true;

  const _purpuposedSteps: IPrintableStep[] = getPrintableStepsFromFolder(toolbox, PURPOSED_STEPS_PATH);

  const customStepID = _purpuposedSteps.length;
  _purpuposedSteps.push({ id: customStepID, name: '_custom_steps_only' });

  while (addNewStep) {
    const idSelected = await inputExtension(
      '_id',
      Translator.translate('workflow.newWorkflow.step', { printableSteps: printableSteps(_purpuposedSteps) })
    );
    const selectedStep = _purpuposedSteps.find((item) => `${item.id}` === idSelected || `${item.name}` === idSelected);

    if (!selectedStep) {
      print(toolbox, Translator.translate('error.selectCorrectStep'), 'error');
      addNewStep = await toolbox.prompt.confirm(
        Translator.translate('workflow.newStep.question', { wokrflowName: workflow.name })
      );
    } else {
      if (selectedStep.id === customStepID) {
        addNewStep = false;
      } else {
        workflow.addRequestedStep(selectedStep.name);
        addNewStep = await toolbox.prompt.confirm(
          Translator.translate('workflow.newStep.question', { wokrflowName: workflow.name })
        );
      }
    }
  }

  return workflow;
}
