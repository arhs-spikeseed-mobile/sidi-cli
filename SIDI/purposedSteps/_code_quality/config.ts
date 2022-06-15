import { IConfig } from '../../../src/models/SidiModel';
import { commonConfig, qualityConfig, rnConfig } from '../configs';

const config: IConfig = {
  mandatoryKeys: [],
  conditionalSteps: [...commonConfig, ...rnConfig, ...qualityConfig],
  stepsFamily: [
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
    '_audit_packages_yarn',
    '_audit_packages_outdated',
    '_audit_packages_urls',
    '_audit_packages_third_parties',
    '_audit_export_report',
    '_audit_app_decompile',
    '_audit_app_permissions',
    '_audit_app_sizes',
    '_audit_app_logs',
    '_deploy_to_cicd',
    '_audit_conditional_fail',
    '_send_slack_message',
    '_send_teams_message',
    '_git_status_ending',
  ],
  publishingSteps: ['_git_status_ending_failure'],
};

export default config;
