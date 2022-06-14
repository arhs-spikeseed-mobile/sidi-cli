import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  codemagicSpecialCase: {
    stepName: '_send_slack_message',
  },
  mandatoryKeys: [{ key: 'CHANNEL_NAME', globalValue: true }],
};

export default config;
