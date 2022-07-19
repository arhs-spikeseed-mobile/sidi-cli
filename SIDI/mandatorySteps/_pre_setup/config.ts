import { IConfig } from '../../../src/models/SidiModel';
import { commonConfig } from '../../purposedSteps/configs';

const config: IConfig = {
  mandatoryKeys: [],
  conditionalSteps: [...commonConfig],
  stepsFamily: [
    '_get_variables_from_file',
    '_setup_general_default_values',
    '_gitlab_status_beginning',
    '_github_status_beginning',
    '_setup_react_native_default_values',
    '_setup_ios_default_values',
    '_setup_android_default_values',
    '_git_ssh_and_clone',
  ],
};

export default config;
