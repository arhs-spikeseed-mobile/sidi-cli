import { IConfig } from '../../../src/models/SidiModel';
import androidManifest from '../../../src/customChecks/AndroidManifest';
import { GluegunToolbox } from 'gluegun';
import { androidConfig, commonConfig, flutterConfig, rnConfig } from '../configs';

const config: IConfig = {
  mandatoryKeys: [],
  conditionalSteps: [...commonConfig, ...rnConfig, ...flutterConfig, ...androidConfig],
  checks: [
    {
      check: (toolbox: GluegunToolbox) => androidManifest(toolbox),
      conditions: [
        {
          key: 'hasVersionedBranches',
          expectedValues: ['true'],
          choices: ['true', 'false'],
        },
      ],
    },
  ],
  stepsFamily: [
    '_setup_app_assets',
    '_react_native_pre_build',
    '_flutter_pre_build',
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
    '_flutter_yarn_install',
    '_flutter_jest',
    '_flutter_lint',
    '_flutter_prettier',
    '_android_set_manifest_version',
    '_android_set_version_code_name',
    '_android_run_lint',
    '_android_run_ut',
    '_android_build_apk',
    '_android_build_aab',
    '_sourcemap_to_artifact',
    '_deploy_to_cicd',
    '_deploy_generate_changelogs',
    '_deploy_to_firebase_android',
    '_deploy_to_play_store',
    '_git_send_tag',
    '_send_slack_message',
    '_send_teams_message',
    '_gitlab_status_ending',
    '_github_status_ending',
  ],
  publishingSteps: ['_gitlab_status_ending_failure', '_github_status_ending_failure'],
};

export default config;
