import { IConfig } from '../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'END_TO_END_BROWSERSTACK_USER_NAME' },
    { key: 'END_TO_END_BROWSERSTACK_API_TOKEN' },
    { key: 'END_TO_END_BROWSERSTACK_LOCAL_MODE' },
    { key: 'END_TO_END_BROWSERSTACK_LOCAL_TOKEN' },
  ],
  stepsFamily: [
    '_get_variables_from_file',
    '_e2e_install',
    '_e2e_downloads_apps_artifacts',
    '_e2e_upload_apps_artifacts',
    '_e2e_launch_browserstack_builds',
    '_e2e_zip_artifacts',
  ]
};

export default config;
