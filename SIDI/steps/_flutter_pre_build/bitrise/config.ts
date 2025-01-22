import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'NVM_VERSION', globalValue: true, defaultValue: '0.39.0' },
    { key: 'NODE_VERSION', globalValue: true, defaultValue: '12.19.0' },
  ],
};

export default config;
