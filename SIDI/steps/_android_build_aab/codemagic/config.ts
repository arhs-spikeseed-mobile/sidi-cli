import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [
    { key: 'GRADLEW_PATH', globalValue: true, defaultValue: 'android' },
    { key: 'ANDROID_BUILD_VARIANT' },
    { key: 'AAB_SPECIFIC_BUILD_VARIANT' },
  ],
  artifacts: ['$TARGET_ANDROID/build/outputs/**/**/*.aab', '$TARGET_ANDROID/build/outputs/**/**/*.apk'],
};

export default config;
