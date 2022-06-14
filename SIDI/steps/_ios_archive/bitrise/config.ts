import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [
    { key: 'IOS_PROJECT_ROOT', globalValue: true, defaultValue: 'ios' },
    { key: 'IOS_PROJECT_FILE_NAME', globalValue: true },
    { key: 'IOS_SCHEME' },
    { key: 'IOS_EXPORT_ALL_DSYM', defaultValue: 'no' },
    { key: 'IOS_COMPILE_BITCODE', defaultValue: 'yes' },
    { key: 'IOS_UPLOAD_BITCODE', defaultValue: 'yes' },
    { key: 'IOS_EXPORT_METHOD', defaultValue: 'development' },
  ],
};

export default config;
