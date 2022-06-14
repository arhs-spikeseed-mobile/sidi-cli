import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  replaceIfDuplicate: true,
  mandatoryKeys: [
    { key: 'TEAMS_BUILDS_WEBHOOCKS', globalValue: true },
    { key: 'CODE_MAGIC_TOKEN', globalValue: true },
  ],
};

export default config;
