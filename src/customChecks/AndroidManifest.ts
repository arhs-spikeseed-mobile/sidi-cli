import * as xml2js from 'xml2js';
import * as FS from 'fs';
import { GluegunToolbox } from 'gluegun';
import { print } from '../utils/Printer';
import Translator from '../translations/Translator';
import { findFileInProject } from '../utils/FileHelpers';

// Check if project's manifest file contain expected keys
export default async function androidManifest(toolbox: GluegunToolbox): Promise<boolean> {
  const { inputExtension } = toolbox;
  let manifestSetProperly = false;

  while (!manifestSetProperly) {
    const androidManifestPath = await findFileInProject(toolbox, 'AndroidManifest', 'xml');

    if (androidManifestPath) {
      // check if keys set properly in manifest
      const manifestFile = FS.readFileSync(`${androidManifestPath}`, 'utf8');
      let manifestFileParsed;
      try {
        manifestFileParsed = await xml2js.parseStringPromise(manifestFile);
        if (manifestFileParsed?.manifest && manifestFileParsed?.manifest['$']) {
          const versionCode = manifestFileParsed?.manifest['$']['android:versionCode'];
          const versionName = manifestFileParsed?.manifest['$']['android:versionName'];
          if (versionCode && versionName) {
            manifestSetProperly = true;
          }
        }
      } catch (e) {
        print(toolbox, e, 'error');
        return true;
      }
      if (!manifestSetProperly) {
        await inputExtension('userInput', Translator.translate('checker.androidManifest.setKeys'));
      }
    }
  }
  print(toolbox, Translator.translate('checker.androidManifest.success'), 'success');
  return true;
}
