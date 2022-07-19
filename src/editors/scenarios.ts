import { GluegunToolbox } from 'gluegun';
import { SidiConfig } from '../main/SidiConfig';
import { WorkflowConfig } from '../main/WorkflowConfig';
import Translator from '../translations/Translator';
import { arrayNotEmpty } from '../utils/Helpers';

export async function duplicateScenario(
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

export function deleteScenario(
  toolbox: GluegunToolbox,
  sidiConfig: SidiConfig,
  selectedWorkflowName: string
): SidiConfig {
  sidiConfig.deleteWorkflow(selectedWorkflowName);
  return sidiConfig;
}

export function changeCICDScenario(toolbox: GluegunToolbox, sidiConfig: SidiConfig): SidiConfig {
  sidiConfig.changeCICD(sidiConfig.cicd === 'bitrise' ? 'codemagic' : 'bitrise');
  return sidiConfig;
}

export async function editScenario(
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
    stepChoices.push({
      key: 'editMaxDuration',
      choice: Translator.translate('edit.updateWorkflow.editMaxDuration'),
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
    // DELETE STEP
    const selectedStepName = await selectExtension(
      Translator.translate('edit.step.delete', { workflowName: selectedWorkflowName }),
      [...sidiConfig._workflowConfigs[selectedWorkflowName].stepsNames]
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].deleteRequestedStep(selectedStepName);
  } else if (userStepChoice.key === 'deleteCustomStep') {
    // DELETE CUSTOM STEP
    const selectedStepName = await selectExtension(
      Translator.translate('edit.step.delete', { workflowName: selectedWorkflowName }),
      [...sidiConfig._workflowConfigs[selectedWorkflowName].customSteps.map((item) => item.stepName)]
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].deleteCustomStep(selectedStepName);
  } else if (userStepChoice.key === 'deletePublishingCustomStep') {
    // DELETE PUBLISHING STEP
    const selectedStepName = await selectExtension(
      Translator.translate('edit.step.delete', { workflowName: selectedWorkflowName }),
      [...sidiConfig._workflowConfigs[selectedWorkflowName].publishingCustomSteps.map((item) => item.stepName)]
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].deletePublishingCustomStep(selectedStepName);
  } else if (userStepChoice.key === 'editPushTrigger') {
    // CONFIG PUSH EVENT BRANCH
    const pattern = await inputExtension(
      'pushTriggerPattern',
      Translator.translate('edit.step.pushTriggerPattern', { workflowName: selectedWorkflowName })
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].setCustomTriggerPattern(pattern);
  } else if (userStepChoice.key === 'editAndroidSigning') {
    // EDIT ANDROID SIGNING
    const referenceName = await inputExtension(
      'referenceName',
      Translator.translate('edit.step.androidSigningName', { workflowName: selectedWorkflowName })
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].setAndroidSigningKeystoreRef(referenceName);
  } else if (userStepChoice.key === 'editMaxDuration') {
    // EDIT MAX DURATION TIME
    const maxDuration = await inputExtension(
      'maxDuration',
      Translator.translate('edit.step.maxDuration', { workflowName: selectedWorkflowName })
    );
    sidiConfig._workflowConfigs[selectedWorkflowName].setBuildDurationTime(maxDuration);
  } else {
    // DEFAULT - JUST UPDATE
    await sidiConfig.updateWorkflow(toolbox, selectedWorkflowName);
  }
  return sidiConfig;
}
