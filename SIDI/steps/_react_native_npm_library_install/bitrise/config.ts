import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [{ key: 'SAMPLE_APP_PATH', globalValue: true, defaultValue: 'example' }, { key: 'NPM_VERSION', globalValue: true }],
};

export default config;
