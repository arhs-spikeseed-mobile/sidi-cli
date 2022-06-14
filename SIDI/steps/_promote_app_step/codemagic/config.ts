import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [
    { key: 'REPOSITORY_URL' },
    { key: 'BRANCHES' },
    { key: 'APP_VERSION' },
    { key: 'IS_VERSIONED_BRANCH' },
  ],
};

export default config;
