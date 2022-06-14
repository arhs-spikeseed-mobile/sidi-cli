import { GluegunToolbox } from 'gluegun';
import * as FastGlob from 'fast-glob';
import { print, printSeparator } from './Printer';
import * as FS from 'fs';
import Translator from '../translations/Translator';
import { CONFIG_TS } from '../Constants';
import { IConfig } from '../models/SidiModel';
import { IFileConfigs } from '../models/FileModels';
import { arrayNotEmpty } from './Helpers';

let lastFile: { name: string; path: string };

const ignoreList = [
  // # All
  '^npm-debug\\.log$', // Error log for npm
  '^\\..*\\.swp$', // Swap file for vim state

  // # macOS
  '^\\.DS_Store$', // Stores custom folder attributes
  '^\\.AppleDouble$', // Stores additional file resources
  '^\\.LSOverride$', // Contains the absolute path to the app to be used
  '^Icon\\r$', // Custom Finder icon: http://superuser.com/questions/298785/icon-file-on-os-x-desktop
  '^\\._.*', // Thumbnail
  '^\\.Spotlight-V100(?:$|\\/)', // Directory that might appear on external disk
  '\\.Trashes', // File that might appear on external disk
  '^__MACOSX$', // Resource fork

  // # Linux
  '~$', // Backup file

  // # Windows
  '^Thumbs\\.db$', // Image file cache
  '^ehthumbs\\.db$', // Folder config file
  '^Desktop\\.ini$', // Stores custom folder attributes
  '@eaDir$', // Synology Diskstation "hidden" folder where the server stores thumbnails
];

// Get step's config files in SIDI folder
export function getConfigFiles(fileName: string, stepName: string): IFileConfigs {
  const stepConfigFile: IConfig = require(`${fileName}/${stepName}/${CONFIG_TS}`).default;

  return {
    stepConfigFile,
  };
}

// Check if path correct + file exist
export async function findFileInProject(
  toolbox: GluegunToolbox,
  fileName: string,
  extension = 'json',
  printLog = true
): Promise<string> {
  const { selectExtension, inputExtension } = toolbox;

  let filePath: string;
  let fileFound = false;

  printSeparator(toolbox, Translator.translate('checker.packageJson.title', { fileName: `${fileName}.${extension}` }));

  // To not request the path for each check
  if (lastFile && lastFile.name === fileName) {
    fileFound = FS.existsSync(lastFile.path);
    if (fileFound === true) {
      filePath = lastFile.path;
    }
  }

  while (!fileFound) {
    const files = await FastGlob(`**/${fileName}.${extension}`, { ignore: ['**/node_modules/**'], dot: true });
    if (arrayNotEmpty(files)) {
      if (files.length === 1) {
        if (printLog) print(toolbox, Translator.translate('checker.packageJson.alone', { path: files[0] }));
        filePath = files[0];
      } else {
        filePath = await selectExtension(Translator.translate('checker.packageJson.multipleFiles'), files);
      }
    }

    if (!filePath || filePath.length === 0) {
      filePath = await inputExtension(
        'packageJsonPath',
        Translator.translate('checker.packageJson.notFound', { fileName: `${fileName}${extension}` })
      );
    }
    fileFound = FS.existsSync(filePath);

    if (!filePath) {
      if (printLog)
        print(
          toolbox,
          Translator.translate('checker.packageJson.error', { fileName: `${fileName}${extension}` }),
          'error'
        );
      filePath = '';
    }
  }

  lastFile = { name: fileName, path: filePath };

  return filePath;
}

// To not take into account file systems
export const junkRegex = new RegExp(ignoreList.join('|'));
export function isJunk(filename) {
  return junkRegex.test(filename);
}
export function isNotJunk(filename) {
  return !isJunk(filename);
}
