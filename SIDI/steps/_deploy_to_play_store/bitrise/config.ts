import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [
    { key: 'ANDROID_PACKAGE_NAME', globalValue: true },
    { key: 'SERVICE_ACCOUNT_PATH', globalValue: true },
  ],
};

export default config;
