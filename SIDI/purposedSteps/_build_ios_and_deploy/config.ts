import { IConfig } from '../../../src/models/SidiModel';
import { commonConfig, rnConfig, iosConfig } from '../configs';

const config: IConfig = {
  mandatoryKeys: [],
  conditionalSteps: [...commonConfig, ...rnConfig, ...iosConfig],
  stepsFamily: [
    '_setup_app_assets',
    '_react_native_pre_build',
    '_npm_private_login',
    '_react_native_yarn_install',
    '_react_native_lint',
    '_react_native_tsc',
    '_react_native_prettier',
    '_react_native_jest',
    '_react_native_npm_install',
    '_react_native_npm_lint',
    '_react_native_npm_tsc',
    '_react_native_npm_prettier',
    '_react_native_npm_jest',
    '_react_native_npm_library_install',
    '_react_native_yarn_library_install',
    '_ios_setup_file_type',
    '_ios_setup_build_number',
    '_ios_setup_certificate_install',
    '_ios_setup_pod_install',
    '_ios_setup_carthage_install',
    '_ios_archive',
    '_ios_run_ut',
    '_sourcemap_to_artifact',
    '_deploy_to_cicd',
    '_deploy_generate_changelogs',
    '_deploy_to_firebase_ios',
    '_deploy_to_itunes',
    '_git_send_tag',
    '_send_slack_message',
    '_send_teams_message',
    '_gitlab_status_ending',
    '_github_status_ending',
  ],
  publishingSteps: ['_gitlab_status_ending_failure', '_github_status_ending_failure'],
};

export default config;
