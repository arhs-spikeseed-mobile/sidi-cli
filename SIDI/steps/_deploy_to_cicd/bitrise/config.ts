import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [{ key: 'EMAILS_TO_NOTIFY' }],
};

export default config;
