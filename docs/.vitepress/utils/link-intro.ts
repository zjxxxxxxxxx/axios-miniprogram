import { linkSync, unlinkSync } from 'node:fs';
import { resolve } from '../../../scripts/utils';

const readmePath = resolve('README.md');
const introPath = resolve('docs/pages/guide/intro.md');

export function linkIntro() {
  try {
    unlinkSync(introPath);
  } catch {
    //
  }
  linkSync(readmePath, introPath);
}
