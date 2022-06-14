import { IConfig } from '../../../src/models/SidiModel';
import { commonConfig, qualityConfig, rnConfig } from '../configs';

const config: IConfig = {
  mandatoryKeys: [],
  conditionalSteps: [...commonConfig, ...rnConfig, ...qualityConfig],
  stepsFamily: ['_promote_app_step'],
};

export default config;
