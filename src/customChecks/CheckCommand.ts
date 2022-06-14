import { GluegunToolbox } from 'gluegun';
import * as FS from 'fs';
import { findFileInProject } from '../utils/FileHelpers';
import { print } from '../utils/Printer';
import Translator from '../translations/Translator';

// Check if project's package.json properly set for the command
export default async function checkCommand(toolbox: GluegunToolbox, command: string): Promise<boolean> {
  const { inputExtension } = toolbox;

  let commandSetProperly = false;

  let packageJson: string;
  let packageJsonParsed;

  while (!commandSetProperly) {
    const packageJsonPath = await findFileInProject(toolbox, 'package');

    packageJson = FS.readFileSync(packageJsonPath, 'utf8');
    packageJsonParsed = JSON.parse(packageJson);

    // check if command set properly in package.json
    commandSetProperly = !!(packageJsonParsed.scripts && packageJsonParsed.scripts[command]);
    if (!commandSetProperly) {
      await inputExtension('userInput', Translator.translate('checker.customCommand.setKeys', { command }));
    }
  }
  print(toolbox, Translator.translate('checker.customCommand.success', { command }), 'success');
  return true;
}
