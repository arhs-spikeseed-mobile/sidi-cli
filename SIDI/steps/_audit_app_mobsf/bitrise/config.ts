import { IConfig } from '../../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [{ key: 'MOBSF_CHECK_PATH', defaultValue: "." }, { key: 'MOBSF_THRESHOLD', defaultValue: "WARNING" }],
};

export default config;
