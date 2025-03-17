import { IConfig } from '../../../src/models/SidiModel';
import { commonConfig, flutterConfig, qualityConfig, rnConfig } from '../configs';

const config: IConfig = {
  mandatoryKeys: [],
  conditionalSteps: [...commonConfig, ...rnConfig, ...flutterConfig, ...qualityConfig],
  stepsFamily: ['_promote_app_step'],
};

export default config;
