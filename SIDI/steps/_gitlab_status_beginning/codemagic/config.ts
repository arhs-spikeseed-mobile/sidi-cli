import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'GITLAB_REPOSITORY_ID', globalValue: true },
    { key: 'GITLAB_TOKEN', globalValue: true },
    { key: 'GITLAB_STATUS_URL', globalValue: true, defaultValue: 'https://gitlab.com/api/v4' },
    { key: 'CODEMAGIC_BUILD_CONTEXT', defaultValue: 'CodeMagicFullBuild' },
  ],
};

export default config;
