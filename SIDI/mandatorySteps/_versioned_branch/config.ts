import { IConfig } from '../../../src/models/SidiModel';

const config: IConfig = {
  mandatoryKeys: [],
  conditionalSteps: [
    {
      conditions: [{ key: 'hasVersionedBranches', expectedValues: ['true'], choices: ['true', 'false'] }],
      stepsNames: ['_check_versioned_branch_step'],
    },
  ],
  stepsFamily: ['_check_versioned_branch_step'],
};

export default config;
