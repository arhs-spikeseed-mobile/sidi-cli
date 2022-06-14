import * as FastGlob from 'fast-glob';
import { arrayNotEmpty } from '../utils/Helpers';

// Check if iOS project works with xcworkspace or xcodeproj
export default async function iosProjectType(): Promise<'xcworkspace' | 'xcodeproj'> {
  const podfiles = await FastGlob('**/Podfile', { ignore: ['**/node_modules/**'] });
  const xcworkspaceFile = await FastGlob('**/*.xcworkspacedata', { ignore: ['**/node_modules/**'] });
  if (arrayNotEmpty(podfiles) || arrayNotEmpty(xcworkspaceFile)) {
    return 'xcworkspace';
  }
  return 'xcodeproj';
}
