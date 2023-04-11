import minimist from 'minimist';
import consola from 'consola';
import { exec } from './utils';

const args = minimist(process.argv.slice(2));
const watch = Boolean(args.watch || args.w);
const all = Boolean(args.all || args.a);
const sourceMap = all || Boolean(args.sourceMap || args.s);
const dts = all || Boolean(args.dts || args.d);

main();

function main() {
  exec('rimraf dist');

  consola.info('Rollup');
  try {
    exec(
      `rollup -c ${
        watch ? '-w' : ''
      } --environment SOURCE_MAP:${sourceMap},DTS:${dts}`,
    );
  } catch {
    consola.error('已退出');
    process.exit();
  }

  console.info('\n');
}
