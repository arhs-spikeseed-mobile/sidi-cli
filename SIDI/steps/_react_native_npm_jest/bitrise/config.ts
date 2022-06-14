import { IConfig } from '../../../../src/models/SidiModel';
import { GluegunToolbox } from 'gluegun';
import jest from '../../../../src/customChecks/Jest';

const config: IConfig = {
  mandatoryKeys: [],
  checks: [
    {
      check: (toolbox: GluegunToolbox) => jest(toolbox),
      conditions: [
        { key: 'projectType', expectedValues: ['react-native'] },
        { key: '_react_native_jest', expectedValues: ['true'] },
      ],
    },
  ],
};

export default config;
