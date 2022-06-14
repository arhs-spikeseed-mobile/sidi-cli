import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [
    { key: 'FIREBASE_IOS_APP_ID' },
    { key: 'DEPLOYMENT_GROUP' },
    { key: 'FIREBASE_TOKEN', globalValue: true },
  ],
};

export default config;
