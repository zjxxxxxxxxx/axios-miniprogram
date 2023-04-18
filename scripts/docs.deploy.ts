import consola from 'consola';
import { exec } from './utils';

main();

function main() {
  exec('pnpm docs:build');

  console.log('');
  consola.info('Clean');
  const exist = exec('git branch --list docs', {
    stdio: 'pipe',
  })
    .toString()
    .trim();
  if (exist) {
    exec('git branch -D docs');
  }
  console.log('');

  consola.info('Create docs\n');
  exec('git branch docs');

  consola.info('Push docs\n');
  exec('git push origin docs -f');
}
