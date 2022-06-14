import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [
    { key: 'IOS_DEPLOY_PWD', globalValue: true },
    { key: 'APPLE_APP_SPECIFIC_PASSWORD', globalValue: true },
    { key: 'IOS_DEPLOY_USERNAME', globalValue: true },
  ],
};

export default config;
