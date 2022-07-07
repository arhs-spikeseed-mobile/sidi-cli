import { GluegunToolbox } from 'gluegun';
import { SidiConfig } from '../main/SidiConfig';
import { printSeparator } from '../utils/Printer';
import Translator from '../translations/Translator';
import { requestWorkflowNameAndSteps } from '../editors/requests';

/**
 * Prepare the workflow, will ask the name to the user and purposed steps expected in the workflow
 */
export async function requestWorkflow(toolbox: GluegunToolbox, sidiConfig: SidiConfig): Promise<SidiConfig> {
  const { prompt } = toolbox;

  printSeparator(toolbox, Translator.translate('workflow.title'));

  let addNewWorkflow = true;
  while (addNewWorkflow) {
    sidiConfig.addNewWorkflow(await requestWorkflowNameAndSteps(toolbox, sidiConfig));

    printSeparator(toolbox, Translator.translate('workflow.newWorkflow.title'));
    addNewWorkflow = await prompt.confirm(Translator.translate('workflow.newWorkflow.question'));
  }

  return sidiConfig;
}
