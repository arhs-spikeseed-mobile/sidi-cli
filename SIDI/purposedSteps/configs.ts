import { IConditionalStep } from '../../src/models/SidiModel';

export const commonConfig: IConditionalStep[] = [
  {
    conditions: [{ key: '_setup_app_assets', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_setup_app_assets'],
  },
  {
    conditions: [{ key: '_git_send_tag', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_git_send_tag'],
  },
  {
    conditions: [
      { key: 'repositoryManager', expectedValues: ['gitlab'], choices: ['gitlab', 'github', 'other'] },
      { key: 'updateGitStatus', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_gitlab_status_beginning', '_gitlab_status_ending', '_gitlab_status_ending_failure'],
  },
  {
    conditions: [
      { key: 'repositoryManager', expectedValues: ['github'], choices: ['gitlab', 'github', 'other'] },
      { key: 'updateGitStatus', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_github_status_beginning', '_github_status_ending', '_github_status_ending_failure'],
  },
  {
    conditions: [{ key: '_send_slack_message', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_send_slack_message'],
  },
  {
    conditions: [{ key: '_send_teams_message', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_send_teams_message'],
  },
  {
    conditions: [{ key: 'projectType', expectedValues: ['ios', 'react-native'], choices: ['true', 'false'] }],
    stepsNames: ['_setup_ios_default_values'],
  },
  {
    conditions: [{ key: 'projectType', expectedValues: ['android', 'react-native'], choices: ['true', 'false'] }],
    stepsNames: ['_setup_android_default_values'],
  },
  {
    conditions: [{ key: 'projectType', expectedValues: ['react-native'] }],
    stepsNames: ['_react_native_setup_default_values', '_react_native_pre_build'],
  },
];

export const rnConfig: IConditionalStep[] = [
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: '_npm_private_login', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_npm_private_login'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_npm'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['yarn'], choices: ['yarn', 'npm'] },
      { key: '_react_native_yarn_install', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_yarn_install'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['yarn'], choices: ['yarn', 'npm'] },
      { key: '_react_native_lint', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_lint'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['yarn'], choices: ['yarn', 'npm'] },
      { key: '_react_native_tsc', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_tsc'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['yarn'], choices: ['yarn', 'npm'] },
      { key: '_react_native_prettier', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_prettier'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['yarn'], choices: ['yarn', 'npm'] },
      { key: '_react_native_jest', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_jest'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['npm'], choices: ['yarn', 'npm'] },
      { key: '_react_native_npm_install', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_npm_install'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['npm'], choices: ['yarn', 'npm'] },
      { key: '_react_native_jest', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_npm_jest'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['npm'], choices: ['yarn', 'npm'] },
      { key: '_react_native_lint', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_npm_lint'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['npm'], choices: ['yarn', 'npm'] },
      { key: '_react_native_prettier', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_npm_prettier'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'yarnOrNpm', expectedValues: ['npm'], choices: ['yarn', 'npm'] },
      { key: '_react_native_tsc', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_react_native_npm_tsc'],
  },
  {
    conditions: [
      { key: 'projectType', expectedValues: ['react-native'] },
      { key: 'auditPackages', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: [
      '_audit_packages_yarn',
      '_audit_packages_outdated',
      '_audit_packages_urls',
      '_audit_packages_third_parties',
      '_audit_export_report',
      '_audit_app_quality',
      '_audit_conditional_fail',
    ],
  },
];

export const androidConfig: IConditionalStep[] = [
  {
    conditions: [{ key: '_android_run_lint', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_android_run_lint'],
  },
  {
    conditions: [{ key: '_sourcemap_to_artifact', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_sourcemap_to_artifact'],
  },
  {
    conditions: [{ key: '_android_run_ut', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_android_run_ut'],
  },
  {
    conditions: [{ key: '_android_build_aab', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_android_build_aab'],
  },
  {
    conditions: [{ key: '_deploy_to_firebase_android', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_deploy_to_firebase_android'],
  },
  {
    conditions: [{ key: '_deploy_to_play_store', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_deploy_to_play_store'],
  },
  {
    conditions: [{ key: 'hasVersionedBranches', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_android_set_version_code_name', '_android_set_manifest_version'],
  },
];

export const iosConfig: IConditionalStep[] = [
  {
    conditions: [{ key: '_ios_run_ut', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_ios_run_ut'],
  },
  {
    conditions: [
      { key: 'nativeDependency', expectedValues: ['true'], choices: ['true', 'false'] },
      { key: 'podOrCarthage', expectedValues: ['pod'], choices: ['pod', 'carthage'] },
    ],
    stepsNames: ['_ios_setup_pod_install'],
  },
  {
    conditions: [{ key: 'hasVersionedBranches', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_ios_setup_build_number'],
  },
  {
    conditions: [{ key: 'iosExecutableType', expectedValues: ['xcworkspace'] }],
    stepsNames: ['_ios_setup_file_type'],
  },
  {
    conditions: [{ key: '_deploy_to_firebase_ios', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_deploy_to_firebase_ios'],
  },
  {
    conditions: [{ key: '_deploy_to_itunes', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_deploy_to_itunes'],
  },
  {
    conditions: [
      { key: 'nativeDependency', expectedValues: ['true'], choices: ['true', 'false'] },
      { key: 'podOrCarthage', expectedValues: ['carthage'], choices: ['pod', 'carthage'] },
    ],
    stepsNames: ['_ios_setup_carthage_install'],
  },
];

export const qualityConfig: IConditionalStep[] = [
  {
    conditions: [{ key: '_audit_app_decompile', expectedValues: ['true'], choices: ['true', 'false'] }],
    stepsNames: ['_audit_app_decompile'],
  },
  {
    conditions: [
      { key: '_audit_app_decompile', expectedValues: ['true'] },
      { key: '_audit_app_permissions', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_audit_app_permissions'],
  },
  {
    conditions: [
      { key: '_audit_app_decompile', expectedValues: ['true'] },
      { key: '_audit_app_sizes', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_audit_app_sizes'],
  },
  {
    conditions: [
      { key: '_audit_app_decompile', expectedValues: ['true'] },
      { key: '_audit_app_logs', expectedValues: ['true'], choices: ['true', 'false'] },
    ],
    stepsNames: ['_audit_app_logs'],
  },
];
