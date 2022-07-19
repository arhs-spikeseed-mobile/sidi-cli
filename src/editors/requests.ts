import { GluegunToolbox } from 'gluegun';
import { SidiConfig } from '../main/SidiConfig';
import { WorkflowConfig } from '../main/WorkflowConfig';
import Translator from '../translations/Translator';
import { printSeparator } from '../utils/Printer';
import { arrayNotEmpty } from '../utils/Helpers';
import { purposeStepsToWorkflow } from '../utils/PurposeStep';
import { INITIAL_CONFIG_PATH } from '../Constants';

export async function requestWorkflowNameAndSteps(
  toolbox: GluegunToolbox,
  sidiConfig: SidiConfig
): Promise<WorkflowConfig> {
  const { inputExtension, selectExtension, prompt } = toolbox;

  const workflow = new WorkflowConfig(sidiConfig.cicd);
  let validWorkflowName = false;

  while (!validWorkflowName) {
    validWorkflowName = workflow.setNameAndCheckValidity(
      toolbox,
      await inputExtension('name', Translator.translate('workflow.newWorkflow.name'))
    );
  }

  printSeparator(toolbox, `CONFIGURE ${workflow.name}`);

  let duplicateWorkflow = false;

  if (arrayNotEmpty(Object.keys(sidiConfig._workflowConfigs))) {
    duplicateWorkflow = await prompt.confirm(Translator.translate('workflow.duplicateWorkflow'));
  }

  if (duplicateWorkflow) {
    const workflowNameToDuplicate = await selectExtension(
      Translator.translate('workflow.selectWorkflow'),
      Object.keys(sidiConfig._workflowConfigs)
    );
    const workflowToDuplicate = sidiConfig._workflowConfigs[workflowNameToDuplicate];
    if (workflowToDuplicate) {
      workflow.requestedStepsNames = workflowToDuplicate.requestedStepsNames;
      return workflow;
    }
  }

  return await purposeStepsToWorkflow(toolbox, workflow);
}

export async function requestStack(toolbox: GluegunToolbox, cicd: 'bitrise' | 'codemagic'): Promise<any> {
  const { selectExtension } = toolbox;
  let selectedMachineType: string;

  const stacks: Array<string> = require(`${INITIAL_CONFIG_PATH}/${cicd}/stacks.json`);
  const selectedStack = await selectExtension(Translator.translate(`request.selectStack`), ['NONE', ...stacks]);
  if (selectedStack === 'NONE') {
    return 'NONE';
  }
  if (cicd === 'codemagic') {
    return selectedStack;
  }

  if (selectedStack.includes('osx-xcode')) {
    selectedMachineType = await selectExtension(Translator.translate(`request.selectMachineType`), [
      'standard',
      'elite',
    ]);
  }

  if (selectedMachineType) {
    return {
      'bitrise.io': {
        stack: selectedStack,
        machine_type: selectedMachineType,
      },
    };
  } else {
    return {
      'bitrise.io': {
        stack: selectedStack,
      },
    };
  }
}
