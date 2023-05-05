import minimist from 'minimist';
import consola from 'consola';

import { distPath, exec } from './utils';
import { checkSize } from './checkSize';
import { safeExit } from './utils';

const args = minimist(process.argv.slice(2));
const watch = Boolean(args.watch || args.w);
const all = Boolean(args.all || args.a);
const sourceMap = all || Boolean(args.sourceMap || args.s);
const dts = all || Boolean(args.dts || args.d);

main();

function main() {
  exec('rimraf dist');

  consola.info('Rollup');

  safeExit(() => {
    exec(
      `rollup -c rollup.config.ts --configPlugin typescript ${
        watch ? '-w' : ''
      } --environment SOURCE_MAP:${sourceMap},DTS:${dts}`,
    );
  });

  if (!watch) {
    checkSize(`${distPath}/**.js`);
  }

  console.info('\n');
}
