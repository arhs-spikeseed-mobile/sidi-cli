import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [
    { key: 'GITLAB_TOKEN', globalValue: true },
    { key: 'GITLAB_STATUS_URL', globalValue: true, defaultValue: 'https://gitlab.com/api/v4' },
    { key: 'BITRISE_BUILD_CONTEXT', defaultValue: 'BitriseFullBuild' },
  ],
};

export default config;
