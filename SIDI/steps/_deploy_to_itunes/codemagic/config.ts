import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  codemagicSpecialCase: {
    stepName: '_deploy_to_itunes',
  },
  mandatoryKeys: [
    { key: 'APP_STORE_CONNECT_PRIVATE_KEY', globalValue: true },
    { key: 'APP_STORE_CONNECT_KEY_IDENTIFIER', globalValue: true },
    { key: 'APP_STORE_CONNECT_ISSUER_ID', globalValue: true },
    { key: 'TESTFLIGHT_GROUP_NAME', globalValue: true },
  ],
};

export default config;
