import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'TARGET_ANDROID', globalValue: true, defaultValue: 'android/app' },
    { key: 'GRADLEW_PATH', globalValue: true, defaultValue: 'android' },
    { key: 'ANDROID_LINT_CMD', defaultValue: 'lint' },
  ],
};

export default config;
