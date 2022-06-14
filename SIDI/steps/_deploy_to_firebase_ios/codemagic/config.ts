import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  codemagicSpecialCase: {
    stepName: '_deploy_to_firebase_ios',
    platform: 'ios',
  },
  mandatoryKeys: [
    { key: 'FIREBASE_IOS_APP_ID' },
    { key: 'DEPLOYMENT_GROUP' },
    { key: 'FIREBASE_TOKEN', globalValue: true },
  ],
};

export default config;
