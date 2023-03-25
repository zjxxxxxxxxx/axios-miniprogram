import consola from 'consola';
import { exec, getPkgJSON } from './utils';

const { version } = getPkgJSON();

main();

function main() {
  let command = 'npm publish --access public';

  const preid = version.match(/\d-(.+)\.\d$/)?.[1];
  if (preid) {
    command += ` --tag ${preid}`;
  }

  consola.info('Publish NPM');
  exec(command);
}
