import * as FS from 'fs';

/**
 * To Promisify FS.exists
 * @param path
 */
export function existsAsync(path): Promise<boolean> {
  return new Promise(function (resolve) {
    FS.exists(path, function (exists) {
      resolve(exists);
    });
  });
}

/**
 * To Promisify FS.writeFile
 *
 * @param path of the file
 * @param content to add in the file
 * @param encodingFormat encoding format
 */
export function writeAsync(path: string, content: string, encodingFormat: string): Promise<boolean> {
  return new Promise(function (resolve, reject) {
    FS.writeFile(path, content, encodingFormat, function (error) {
      if (error) {
        reject(error);
        throw error;
      }
      resolve(true);
    });
  });
}

/**
 * To Promisify FS.readFile
 *
 * @param path of the file
 * @param encodingFormat encoding format
 */
export function readAsync(path: string, encodingFormat: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    FS.readFile(path, encodingFormat, function (error, content) {
      if (error) {
        reject(error);
        throw error;
      }
      resolve(content);
    });
  });
}

/**
 * To Promisify FS.appendFile
 *
 * @param path of the file
 * @param content to add in the file
 * @param encodingFormat encoding format
 */
export function appendAsync(path: string, content: string, encodingFormat: string): Promise<boolean> {
  return new Promise(function (resolve, reject) {
    FS.appendFile(path, content, function (error) {
      if (error) {
        reject(error);
        throw error;
      }
      resolve(true);
    });
  });
}
