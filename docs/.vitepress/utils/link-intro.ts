import { linkSync } from 'node:fs';
import { resolve } from '../../../scripts/utils';

const readmePath = resolve('README.md');
const introPath = resolve('docs/pages/guide/intro.md');

export function linkIntro() {
  try {
    linkSync(readmePath, introPath);
  } catch {}
}
