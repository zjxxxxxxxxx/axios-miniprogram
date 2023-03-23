import minimist from 'minimist';
import consola from 'consola';
import { exec } from './utils';

const args = minimist(process.argv.slice(2));
const watching = Boolean(args.watch || args.w);
const release = Boolean(args.release || args.r);
const sourceMap = release || Boolean(args.sourceMap || args.s);
const dts = release || Boolean(args.dts || args.d);

build();

function build() {
  exec('rimraf dist');

  consola.info('构建产物');
  exec(
    `rollup -c ${
      watching ? '-w' : ''
    } --environment SOURCE_MAP:${sourceMap},DTS:${dts}`,
  );
}
