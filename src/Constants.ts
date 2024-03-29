// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dirname } = require('path');

const storeMode = require('fs').existsSync(`${__dirname}/../../build`);
const path = storeMode ? '/build' : '';
const type = storeMode ? '.js' : '.ts';

export const INITIAL_CONFIG_PATH = `${dirname(require.main.path)}${path}/SIDI/initial`;
export const PURPOSED_STEPS_PATH = `${dirname(require.main.path)}${path}/SIDI/purposedSteps`;
export const MANDATORY_STEPS_PATH = `${dirname(require.main.path)}${path}/SIDI/mandatorySteps`;
export const DEPENDENCE_STEPS_PATH = `${dirname(require.main.path)}${path}/SIDI/steps`;
export const CACHE_PATH = `${dirname(require.main.path)}/.cache.json`;
export const CUSTOM_STEPS_PATH = `./.sidi/customSteps`;
export const STEP_YAML = 'step.yml';
export const CONFIG_TS = 'config' + type;
export const ENCODING_FORMAT = 'utf8';
export const NPM_IGNORE_FILE = '.npmignore';

export const END_FINAL_YAML = '.yaml';
export const END_FINAL_SECRET_YAML = '-secret.yaml';
export const END_FINAL_SECRET_YAML_CM = '-secret.conf';
