import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'IOS_PROJECT_ROOT', globalValue: true, defaultValue: 'ios' },
    { key: 'IOS_PROJECT_FILE_NAME', globalValue: true },
    { key: 'IOS_TEST_SCHEME_NAME' },
    { key: 'IOS_TEST_OS', defaultValue: '14.3' },
    { key: 'IOS_TEST_GENERATE_COVERAGE' },
    { key: 'IOS_TEST_DEVICE', defaultValue: 'iPhone 12' },
  ],
};

export default config;
