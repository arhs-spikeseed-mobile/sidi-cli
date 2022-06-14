import { IConfig } from '../../../../src/models/SidiModel';
import { GluegunToolbox } from 'gluegun';
import checkCommand from '../../../../src/customChecks/CheckCommand';

const config: IConfig = {
  mandatoryKeys: [],
  checks: [
    {
      check: (toolbox: GluegunToolbox) => checkCommand(toolbox, 'lint'),
      conditions: [
        { key: 'projectType', expectedValues: ['react-native'] },
        { key: '_react_native_lint', expectedValues: ['true'] },
      ],
    },
  ],
};

export default config;
