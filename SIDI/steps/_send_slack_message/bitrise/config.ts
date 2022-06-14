import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [{ key: 'SLACK_WEBHOOCKS', globalValue: true }],
};

export default config;
