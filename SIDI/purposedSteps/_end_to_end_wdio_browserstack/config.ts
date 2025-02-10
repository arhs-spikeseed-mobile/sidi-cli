import { IConfig } from '../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [],
  stepsFamily: [
    '_get_variables_from_file',
    '_e2e_install',
    '_e2e_waiter',
    '_e2e_trigger',
    '_e2e_collect_artifacts',
    '_e2e_generate_console_reports',
    '_e2e_send_build_and_report_notifications',
    '_e2e_launch_builds',
    '_e2e_launcher',
  ]
};

export default config;