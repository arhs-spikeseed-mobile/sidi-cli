import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [{ key: 'CONFIG_FILE_PATH' }, { key: 'CHECK_ANDROID' }, { key: 'CHECK_IOS' }, { key: 'IOS_SCHEME' }],
};

export default config;
