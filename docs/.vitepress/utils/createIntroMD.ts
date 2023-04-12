import { copyFileSync } from 'node:fs';
import { resolve } from '../../../scripts/utils';

const readmePath = resolve('README.md');
const introPath = resolve('docs/pages/intro.md');

export function createIntroMD() {
  copyFileSync(readmePath, introPath);
}
