import { GluegunToolbox } from 'gluegun';
import { supportHyperlink } from './Helpers';
import { IPrintableStep } from '../models/SidiModel';

export function printSeparator(toolbox: GluegunToolbox, text?: string) {
  const { print } = toolbox;
  print.info(`\n----------------------- ${text} -----------------------\n`);
}

export function print(toolbox: GluegunToolbox, text: string, type: 'info' | 'error' | 'warning' | 'success' = 'info') {
  const { print } = toolbox;
  const result = supportHyperlink(text);
  print[type](result);
}

export function printableSteps(steps: IPrintableStep[]) {
  let printableSteps = '';
  steps.map((step: IPrintableStep) => {
    printableSteps += `${step.id}: ${step.name}\n`;
  });
  return printableSteps;
}
