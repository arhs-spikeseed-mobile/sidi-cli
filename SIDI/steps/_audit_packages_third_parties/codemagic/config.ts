import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'IOS_PROJECT_ROOT', globalValue: true, defaultValue: 'ios' },
    { key: 'ANDROID_MODULE_NAME', globalValue: true, defaultValue: ':app' },
    { key: 'GRADLEW_PATH', globalValue: true, defaultValue: 'android' },
    { key: 'FAIL_ON_CVSS_LEVEL', globalValue: true },
  ],
};

export default config;
