import { GluegunToolbox } from 'gluegun';

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.selectExtension = async (message: string, choices: Array<string>) => {
    return (
      await toolbox.prompt.ask({
        type: 'select',
        name: 'key',
        message,
        choices,
      })
    )['key'];
  };
};
