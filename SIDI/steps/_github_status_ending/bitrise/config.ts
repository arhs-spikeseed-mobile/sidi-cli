import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [
    { key: 'GITHUB_TOKEN', globalValue: true },
    { key: 'REPOSITORY_URL', globalValue: true },
    { key: 'API_URL', globalValue: true },
  ],
};

export default config;
