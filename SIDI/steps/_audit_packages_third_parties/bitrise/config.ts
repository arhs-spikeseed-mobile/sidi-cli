import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'IOS_PROJECT_ROOT', globalValue: true, defaultValue: 'ios' },
    { key: 'GRADLEW_PATH', globalValue: true, defaultValue: 'android' },
  ],
};

export default config;
