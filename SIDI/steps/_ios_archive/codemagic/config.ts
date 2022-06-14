import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [
    { key: 'IOS_PROJECT_ROOT', globalValue: true, defaultValue: 'ios' },
    { key: 'IOS_PROJECT_FILE_NAME', globalValue: true },
    { key: 'IOS_SCHEME' },
    { key: 'BUNDLE_ID' },
    { key: 'IOS_EXPORT_METHOD', defaultValue: 'enterprise' },
  ],
  artifacts: [
    'build/ios/ipa/*.ipa',
    '/tmp/xcodebuild_logs/*.log',
    '$HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.app',
    '$HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.dSYM',
  ],
};

export default config;
