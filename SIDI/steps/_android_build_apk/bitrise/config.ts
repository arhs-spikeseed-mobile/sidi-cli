import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [
    { key: 'TARGET_ANDROID', globalValue: true, defaultValue: 'android/app' },
    { key: 'ANDROID_MODULE_NAME', globalValue: true, defaultValue: ':app' },
    { key: 'GRADLEW_PATH', globalValue: true, defaultValue: 'android' },
    { key: 'ANDROID_BUILD_VARIANT' },
    { key: 'ENV_ANDROID_APK_FILTER' },
  ],
};

export default config;
