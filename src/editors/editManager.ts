import { GluegunToolbox } from 'gluegun';
import { SidiConfig } from '../main/SidiConfig';
import Translator from '../translations/Translator';
import { changeCICDScenario, deleteScenario, duplicateScenario, editScenario } from './scenarios';
import { requestWorkflow } from '../main/PrepareWorkflows';

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
