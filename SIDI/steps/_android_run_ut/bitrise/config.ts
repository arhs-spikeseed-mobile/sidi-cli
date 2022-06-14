import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'ANDROID_MODULE_NAME', globalValue: true, defaultValue: ':app' },
    { key: 'ANDROID_UNIT_TEST_CMD', defaultValue: 'testReleaseUnitTest' },
  ],
};

export default config;
