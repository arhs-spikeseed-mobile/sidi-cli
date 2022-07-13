import { GluegunToolbox } from 'gluegun';
import * as terminalLink from 'terminal-link';
import { IPrintableStep } from '../models/SidiModel';
import { SidiConfig, sidiConfigUnwantedKeys } from '../main/SidiConfig';
import { workflowConfigUnwantedKeys } from '../main/WorkflowConfig';
import { END_FINAL_SECRET_YAML, END_FINAL_SECRET_YAML_CM, END_FINAL_YAML } from '../Constants';
import * as FS from 'fs';

/**
 * Convert string aray to printable array
 * That is to say, to print items wit hid and allow user to select item with id
 *
 * @param toolbox: GluegunToolbox
 * @param path of folder where we have steps to print
 */
export function getPrintableStepsFromFolder(toolbox: GluegunToolbox, path: string): IPrintableStep[] {
  const { filesystem } = toolbox;
  const _stepsInFolders = filesystem.inspectTree(path);
  return _stepsInFolders.children
    .map((item, index) => {
      return { id: index, name: item.name };
    })
    .filter((item) => item && item.name.startsWith('_'));
}

/**
 * Convert string aray to printable array
 * That is to say, to print items wit hid and allow user to select item with id
 *
 * @param toolbox: GluegunToolbox
 * @param array to convert
 */
export function getPrintableStepsFromArray(toolbox: GluegunToolbox, array: string[]): IPrintableStep[] {
  return array
    .map((item, index) => {
      return { id: index, name: item };
    })
    .filter((item) => item && item.name.startsWith('_'));
}

/**
 * Check if have already a key saved in an array
 *
 * @param array to check
 * @param key to check if already saved
 */
export function checkIfArrayContainKey(array: any[], key: string) {
  return array.some((item) => item[key]);
}

/**
 * Check if the text contain any blanck space
 *
 * @param text to check
 * @return return true if we have any blank space
 */
export function hasWhiteSpace(text: string): boolean {
  return /\s/g.test(text);
}

/**
 * Display text as an hyperlink, to be able to click directly from de CLI (if supported)
 *
 * @param text to display as a link
 */
export function supportHyperlink(text: string) {
  if (terminalLink.isSupported) {
    const linkRegEx = new RegExp(/\[(.*?)\]\((.*?)\)/, 'g');
    const splittedText: string[] = linkRegEx.exec(text);
    if (splittedText && splittedText.length > 2) {
      const fullText = splittedText[0];
      const description = splittedText[1];
      const url = splittedText[2];
      const cliLink = terminalLink(description, url);

      return text.replace(fullText, cliLink);
    }
  }
  return text;
}

/**
 * Save or not in sidiConfig cache file the key
 * If the key is in sidiConfigUnwantedKeys and/or workflowConfigUnwantedKeys
 * The key will not be saved
 *
 */
export function sidiConfigKeyReplacer(key, value) {
  if (sidiConfigUnwantedKeys.includes(key) || workflowConfigUnwantedKeys.includes(key)) {
    return undefined;
  }
  return value;
}

/**
 * Check if the array is undefined or empty
 *
 * @param array to check
 * @return true if is not empty
 */
export function arrayNotEmpty(array?: Array<any> | string): boolean {
  return array && array.length > 0;
}

/**
 * Check if at the end of the process, SIDI created two yamls (main + variables)
 *
 * @param sidiConfig
 * @param workflows set for the current cicd config
 */
export function checkIfProperlyCreated(sidiConfig: SidiConfig, workflows: { [key: string]: any }): boolean {
  const cicdYamlExist = FS.existsSync(`${sidiConfig.cicd}${END_FINAL_YAML}`);
  const cicdSecretYamlExist =
    FS.existsSync(`.${sidiConfig.cicd}${END_FINAL_SECRET_YAML}`) ||
    FS.existsSync(`.${sidiConfig.cicd}${END_FINAL_SECRET_YAML_CM}`);

  let workflowProperlySet = true;
  for (const workflowName in sidiConfig._workflowConfigs) {
    if (!workflows[workflowName]) {
      workflowProperlySet = false;
      break;
    }
  }

  return !!cicdYamlExist && !!cicdSecretYamlExist && workflowProperlySet;
}

/**
 * Helper to sort keys in object
 *
 * @param object to sort
 */
export function objectSorter(object: any) {
  return Object.keys(object)
    .sort()
    .reduce((accumulator, key) => {
      accumulator[key] = object[key];

      return accumulator;
    }, {});
}

export async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
