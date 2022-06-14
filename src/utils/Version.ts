import { GluegunToolbox } from 'gluegun';
import { print } from './Printer';
import fetch from 'node-fetch';
import Translator from '../translations/Translator';

export async function checkNewVersion(toolbox: GluegunToolbox) {
  require('pkginfo')(module, 'version');
  const currentVersion = module.exports.version;
  const response = await fetch(Translator.translate('newVersion.npmPackageUrl'));
  const resultJson = await response.json();
  const latestVersion = resultJson.latest;

  if (versionCompare(currentVersion, latestVersion) === -1) {
    printNewVersionMessage(toolbox, currentVersion, latestVersion);
  }
}

function printNewVersionMessage(toolbox: GluegunToolbox, currentVersion: string, latestVersion: string) {
  const firstLineText = `${Translator.translate('alert.warning')}  ${Translator.translate(
    'newVersion.updateAvailable',
    { currentVersion, latestVersion }
  )} ${Translator.translate('alert.warning')} `;
  const secondLineText = Translator.translate('newVersion.changelog', { latestVersion });
  const thirdLineText = Translator.translate('newVersion.command');

  const margin = 15;
  let maxTextLenght = firstLineText.length;
  if (secondLineText.length > maxTextLenght) maxTextLenght = secondLineText.length;
  if (thirdLineText.length > maxTextLenght) maxTextLenght = thirdLineText.length;
  maxTextLenght = maxTextLenght + margin;

  let headerFooter = '';
  for (let count = 0; count < maxTextLenght; count++) {
    headerFooter += '#';
  }

  print(toolbox, `\n${headerFooter}\n`, 'error');
  print(toolbox, construcLine(maxTextLenght, firstLineText), 'error');
  print(toolbox, construcLine(maxTextLenght, secondLineText));
  print(toolbox, construcLine(maxTextLenght, thirdLineText));
  print(toolbox, `\n${headerFooter}\n`, 'error');
}

function construcLine(maxTextLenght: number, textToPrint: string): string {
  let result = '';
  for (let count = 0; count <= maxTextLenght - textToPrint.length; count++) {
    if (count < (maxTextLenght - textToPrint.length) / 2) {
      result = ` ${result}`;
    } else if (count === maxTextLenght - textToPrint.length) {
      result = `${result}${textToPrint}`;
    }
  }
  return result;
}

function versionCompare(v1: any, v2: any, options?: any): number {
  // if v1 > v2 result = 1
  // if v1 == v2 result = 0
  // if v1 < v2 result = -1
  const lexicographical = options && options.lexicographical;
  const zeroExtend = options && options.zeroExtend;
  let v1parts = v1.split('.');
  let v2parts = v2.split('.');
  function isValidPart(x: any) {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  }
  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }
  if (zeroExtend) {
    while (v1parts.length < v2parts.length) {
      v1parts.push('0');
    }
    while (v2parts.length < v1parts.length) {
      v2parts.push('0');
    }
  }
  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }
  for (let i = 0; i < v1parts.length; ++i) {
    if (v2parts.length === i) {
      return 1;
    }
    if (v1parts[i] === v2parts[i]) {
      continue;
    }
    if (v1parts[i] > v2parts[i]) {
      return 1;
    }
    return -1;
  }
  if (v1parts.length !== v2parts.length) {
    return -1;
  }
  return 0;
}
