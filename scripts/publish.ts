import fs from 'node:fs';
import consola from 'consola';
import { exec, pkgPath, getPkgJSON } from './utils';

const pkg = getPkgJSON();

main();

function main() {
  consola.info('Generate publish pkg');
  generatePublishPkg();

  let command = 'npm publish --access public';

  const preid = pkg.version.match(/\d-(.+)\.\d$/)?.[1];
  if (preid) {
    command += ` --tag ${preid}`;
  }

  consola.info('Publish NPM');
  exec(command);
}

function generatePublishPkg() {
  const publishPkg: AnyObject = {};

  [
    'name',
    'version',
    'description',
    'main',
    'module',
    'types',
    'files',
    'repository',
    'keywords',
    'author',
    'bugs',
    'homepage',
    'license',
  ].forEach((key) => {
    publishPkg[key] = pkg[key];
  });

  fs.writeFileSync(pkgPath, JSON.stringify(publishPkg, null, 2) + '\n');
}
