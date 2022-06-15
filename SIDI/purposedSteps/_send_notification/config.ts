import { IConfig } from '../../../src/models/SidiModel';
import { commonConfig } from '../configs';

const config: IConfig = {
  mandatoryKeys: [],
  conditionalSteps: [...commonConfig],
  stepsFamily: ['_send_slack_message', '_send_teams_message', '_git_status_ending'],
  publishingSteps: ['_git_status_ending_failure'],
};

export default config;
