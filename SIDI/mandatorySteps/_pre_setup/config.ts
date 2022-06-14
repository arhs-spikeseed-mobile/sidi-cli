import { IConfig } from '../../../src/models/SidiModel';
import { commonConfig } from '../../purposedSteps/configs';

const config: IConfig = {
  mandatoryKeys: [],
  conditionalSteps: [
    ...commonConfig,
    {
      conditions: [{ key: 'updateGitStatus', expectedValues: ['true'], choices: ['true', 'false'] }],
      stepsNames: ['_git_status_beginning', '_git_status_ending'],
    },
  ],
  stepsFamily: [
    '_get_variables_from_file',
    '_setup_general_default_values',
    '_git_status_beginning',
    '_setup_react_native_default_values',
    '_setup_ios_default_values',
    '_setup_android_default_values',
    '_git_ssh_and_clone',
  ],
};

export default config;
