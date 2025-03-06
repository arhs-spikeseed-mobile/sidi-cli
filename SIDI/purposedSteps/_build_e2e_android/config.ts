import { IConfig } from '../../../src/models/SidiModel';
import androidManifest from '../../../src/customChecks/AndroidManifest';
import { GluegunToolbox } from 'gluegun';
import { androidConfig, commonConfig, rnConfig } from '../configs';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'END_TO_END_BROWSERSTACK_USER_NAME' },
    { key: 'END_TO_END_BROWSERSTACK_API_TOKEN' },
    { key: 'END_TO_END_BROWSERSTACK_LOCAL_MODE' },
    { key: 'END_TO_END_BROWSERSTACK_LOCAL_TOKEN' },
  ],
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
    '_get_variables_from_file',
    '_e2e_install',
    '_e2e_downloads_apps_artifacts',
    '_e2e_upload_apps_artifacts',
    '_e2e_launch_browserstack_builds',
    '_e2e_zip_artifacts',
  ],
};

export default config;
