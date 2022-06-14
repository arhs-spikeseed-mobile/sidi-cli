import { GluegunToolbox } from 'gluegun';
import * as FS from 'fs';
import { findFileInProject } from '../utils/FileHelpers';
import { print } from '../utils/Printer';
import Translator from '../translations/Translator';

// Check if project's package.json properly set for jest
export default async function jest(toolbox: GluegunToolbox): Promise<boolean> {
  const { inputExtension } = toolbox;

  let jestSetProperly = false;

  let packageJson: string;
  let packageJsonParsed;

  while (!jestSetProperly) {
    const packageJsonPath = await findFileInProject(toolbox, 'package');

    if (packageJsonPath) {
      packageJson = FS.readFileSync(packageJsonPath, 'utf8');
      packageJsonParsed = JSON.parse(packageJson);

      // check if jest set properly in package.json
      jestSetProperly = !!(
        packageJsonParsed.jest &&
        (packageJsonParsed.dependencies?.jest || packageJsonParsed.devDependencies?.jest)
      );
      if (!jestSetProperly) {
        await inputExtension('userInput', Translator.translate('checker.jest.setKeys'));
      }
    }
  }
  print(toolbox, Translator.translate('checker.jest.success'));
  return true;
}
