import { GluegunToolbox } from 'gluegun';

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.inputExtension = async (name: string, message: string) => {
    return (
      await toolbox.prompt.ask({
        type: 'input',
        name,
        message,
      })
    )[`${name}`];
  };
};
