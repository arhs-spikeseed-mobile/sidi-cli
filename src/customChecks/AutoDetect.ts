import { GluegunToolbox } from 'gluegun';
import * as FastGlob from 'fast-glob';
import { findFileInProject } from '../utils/FileHelpers';
import * as FS from 'fs';
import { IAutoDetect } from '../models/AutoDetect';
import { arrayNotEmpty } from '../utils/Helpers';

export default async function autoDetectProjectType(toolbox: GluegunToolbox): Promise<IAutoDetect> {
  // react-native files
  let hasRN = false;
  const rnFiles = await FastGlob('**/package.json', { ignore: ['**/node_modules/**'] });
  if (arrayNotEmpty(rnFiles)) {
    const packageJsonPath = await findFileInProject(toolbox, 'package', 'json', false);
    const packageJson = FS.readFileSync(packageJsonPath, 'utf8');
    const packageJsonParsed = JSON.parse(packageJson);

    hasRN = !!(packageJsonParsed.dependencies && packageJsonParsed.dependencies['react-native']);

    if (hasRN) return { projectType: 'react-native' };
  }

  // Android files
  const gradleFiles = await FastGlob('**/build.gradle', { ignore: ['**/node_modules/**'] });
  const manifestFiles = await FastGlob('**/build.gradle', { ignore: ['**/node_modules/**'] });
  const hasAndroid = arrayNotEmpty(gradleFiles) || arrayNotEmpty(manifestFiles);

  if (hasAndroid) return { projectType: 'android' };

  // iOS files
  const xcschemeFiles = await FastGlob('**/*.xcscheme', { ignore: ['**/node_modules/**'] });
  const plistFiles = await FastGlob('**/Info.plist', { ignore: ['**/node_modules/**'] });
  const hasIOS = arrayNotEmpty(xcschemeFiles) || arrayNotEmpty(plistFiles);

  if (hasIOS) return { projectType: 'ios' };
}
