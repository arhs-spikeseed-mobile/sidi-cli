import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [{ key: 'GCLOUD_SERVICE_ACCOUNT_CREDENTIALS', globalValue: true }],
  codemagicSpecialCase: {
    stepName: '_deploy_to_play_store',
  },
};

export default config;
