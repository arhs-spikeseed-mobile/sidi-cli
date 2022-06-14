import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'IOS_EXPORT_METHOD', defaultValue: 'enterprise' },
    { key: 'IOS_PROJECT_FILE_NAME', globalValue: true },
  ],
};

export default config;
