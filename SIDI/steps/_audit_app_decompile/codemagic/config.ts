import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'ANDROID_ARTIFACT_URL' },
    { key: 'IOS_ARTIFACT_URL' },
    { key: 'ANDROID_APK_PATH' },
    { key: 'IOS_IPA_PATH' },
  ],
};

export default config;
