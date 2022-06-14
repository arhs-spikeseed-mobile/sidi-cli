import { GluegunToolbox } from 'gluegun';
import { SidiConfig } from '../main/SidiConfig';
import { WorkflowConfig } from '../main/WorkflowConfig';
import Translator from '../translations/Translator';
import { printSeparator } from './Printer';
import { requestWorkflow } from '../main/PrepareWorkflows';
import { purposeStepsToWorkflow } from './PurposeStep';
import { INITIAL_CONFIG_PATH } from '../Constants';
import { arrayNotEmpty } from './Helpers';

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

export async function userEditWorkflow(toolbox: GluegunToolbox, sidiConfig: SidiConfig): Promise<SidiConfig> {
  const { selectExtension } = toolbox;

  const choices = [
    { key: 'deleteWorkflow', choice: Translator.translate('edit.deleteWorkflow.title') },
    { key: 'addWorkflow', choice: Translator.translate('edit.addWorkflow.title') },
    { key: 'updateWorkflow', choice: Translator.translate('edit.updateWorkflow.title') },
    { key: 'duplicateWorkflow', choice: Translator.translate('edit.duplicateWorkflow.title') },
    {
      key: 'changeCICD',
      choice: Translator.translate('edit.changeCICD.title', {
        cicd: sidiConfig.cicd === 'bitrise' ? 'CodeMagic' : 'Bitrise',
      }),
    },
  ];

  const userInput = await selectExtension(
    Translator.translate('edit.title'),
    choices.map((item) => item.choice)
  );
  const userChoice = choices.find((item) => item.choice === userInput);

  // CHANGE CICD
  if (userChoice.key === 'changeCICD') {
    const sureChangeCICD = await selectExtension(
      Translator.translate('edit.changeCICD.question', {
        cicd: sidiConfig.cicd === 'bitrise' ? 'CodeMagic' : 'Bitrise',
      }),
      ['true', 'false']
    );
    if (sureChangeCICD === 'true') {
      return changeCICDScenario(toolbox, sidiConfig);
    } else {
      return sidiConfig;
    }
  }

  // ADD NEW WORKFLOW
  if (userChoice.key === 'addWorkflow') {
    return await requestWorkflow(toolbox, sidiConfig);
  }

  const availableWorkflows = Object.keys(sidiConfig._workflowConfigs);
  const selectedWorkflowName: string = await selectExtension(
    Translator.translate(`edit.${userChoice.key}.question`),
    availableWorkflows
  );

  // switch loop not supported with await/async
  if (userChoice.key === 'duplicateWorkflow') {
    return await duplicateScenario(toolbox, sidiConfig, selectedWorkflowName);
  } else if (userChoice.key === 'updateWorkflow') {
    return await editScenario(toolbox, sidiConfig, selectedWorkflowName);
  } else if (userChoice.key === 'deleteWorkflow') {
    return deleteScenario(toolbox, sidiConfig, selectedWorkflowName);
  }
  return sidiConfig;
}

async function duplicateScenario(
  toolbox: GluegunToolbox,
  sidiConfig: SidiConfig,
  selectedWorkflowName: string
): Promise<SidiConfig> {
  const { inputExtension } = toolbox;

  const newWorkflow = new WorkflowConfig(sidiConfig.cicd, sidiConfig._workflowConfigs[selectedWorkflowName]);
  let validWorkflowName = false;

  while (!validWorkflowName) {
    validWorkflowName = newWorkflow.setNameAndCheckValidity(
      toolbox,
      await inputExtension('name', Translator.translate('workflow.newWorkflow.name'))
    );
  }
  sidiConfig.addNewWorkflow(new WorkflowConfig(sidiConfig.cicd, newWorkflow));
  return sidiConfig;
}

function deleteScenario(toolbox: GluegunToolbox, sidiConfig: SidiConfig, selectedWorkflowName: string): SidiConfig {
  sidiConfig.deleteWorkflow(selectedWorkflowName);
  return sidiConfig;
}

function changeCICDScenario(toolbox: GluegunToolbox, sidiConfig: SidiConfig): SidiConfig {
  sidiConfig.changeCICD(sidiConfig.cicd === 'bitrise' ? 'codemagic' : 'bitrise');
  return sidiConfig;
}

async function editScenario(
  toolbox: GluegunToolbox,
  sidiConfig: SidiConfig,
  selectedWorkflowName: string
): Promise<SidiConfig> {
  const { selectExtension, inputExtension } = toolbox;
  sidiConfig.changeSidiMode({ mode: 'edit', workflowName: selectedWorkflowName });
  // Update steps in selected workflow
  const stepChoices = [
    { key: 'deleteStep', choice: Translator.translate('edit.updateWorkflow.deleteStep') },
    { key: 'addStep', choice: Translator.translate('edit.updateWorkflow.addStep') },
  ];

  // Custom push event pattern
  if (sidiConfig.cicd === 'codemagic') {
    stepChoices.push({ key: 'editPushTrigger', choice: Translator.translate('edit.updateWorkflow.editPushTrigger') });
    stepChoices.push({
      key: 'editAndroidSigning',
      choice: Translator.translate('edit.updateWorkflow.editAndroidSigning'),
    });
  }

  // Delete a custom step
  if (arrayNotEmpty(sidiConfig._workflowConfigs[selectedWorkflowName].customSteps)) {
    stepChoices.push({ key: 'deleteCustomStep', choice: Translator.translate('edit.updateWorkflow.deleteCustomStep') });
  }

  // Delete a custom step in publishing section
  if (arrayNotEmpty(sidiConfig._workflowConfigs[selectedWorkflowName].publishingCustomSteps)) {
    stepChoices.push({
      key: 'deletePublishingCustomStep',
      choice: Translator.translate('edit.updateWorkflow.deletePublishingCustomStep'),
    });
  }

  const userInputChoice = await selectExtension(
    Translator.translate('edit.step.title', { workflowName: selectedWorkflowName }),
    stepChoices.map((item) => item.choice)
  );
  const userStepChoice = stepChoices.find((item) => item.choice === userInputChoice);

  if (userStepChoice.key === 'deleteStep') {
    const selectedStepName = await selectExtension(
      Translator.translate('edit.step.delete', { workflowName: selectedWorkflowName }),
      [...sidiConfig._workflowConfigs[selectedWorkflowName].stepsNames]
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].deleteRequestedStep(selectedStepName);
  } else if (userStepChoice.key === 'editPushTrigger') {
    const pattern = await inputExtension(
      Translator.translate('edit.step.pushTriggerPattern', { workflowName: selectedWorkflowName })
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].setCustomTriggerPattern(pattern);
  } else if (userStepChoice.key === 'editAndroidSigning') {
    const referenceName = await inputExtension(
      Translator.translate('edit.step.androidSigningName', { workflowName: selectedWorkflowName })
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].setAndroidSigningKeystoreRef(referenceName);
  } else if (userStepChoice.key === 'deleteCustomStep') {
    const selectedStepName = await selectExtension(
      Translator.translate('edit.step.delete', { workflowName: selectedWorkflowName }),
      [...sidiConfig._workflowConfigs[selectedWorkflowName].customSteps.map((item) => item.stepName)]
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].deleteCustomStep(selectedStepName);
  } else if (userStepChoice.key === 'deletePublishingCustomStep') {
    const selectedStepName = await selectExtension(
      Translator.translate('edit.step.delete', { workflowName: selectedWorkflowName }),
      [...sidiConfig._workflowConfigs[selectedWorkflowName].publishingCustomSteps.map((item) => item.stepName)]
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].deletePublishingCustomStep(selectedStepName);
  } else {
    await sidiConfig.updateWorkflow(toolbox, selectedWorkflowName);
  }
  return sidiConfig;
}
