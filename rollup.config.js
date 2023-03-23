import path from 'node:path';
import esbuild from 'rollup-plugin-esbuild';
import dtsPlugin from 'rollup-plugin-dts';
import { __dirname, getPkgJSON } from './scripts/utils.js';

const pkg = getPkgJSON();
const inputPath = path.resolve(__dirname, 'src/index.ts');
const outputPath = path.resolve(__dirname, 'dist');
const sourceMap = process.env.SOURCE_MAP === 'true';
const dts = process.env.DTS === 'true';

export default main();

function main() {
  const configs = [buildConfig('esm'), buildConfig('cjs')];
  if (dts) {
    configs.push(buildConfig('dts'));
  }
  return configs;
}

function buildConfig(format) {
  const isDts = format === 'dts';
  const output = {
    file: resolvePath(format, isDts),
    format: isDts ? 'es' : format,
    name: pkg.name,
    exports: 'default',
    indent: false,
    sourcemap: isDts ? false : sourceMap,
  };

  return {
    input: inputPath,
    output,
    plugins: [
      isDts
        ? dtsPlugin({
            tsconfig: path.resolve(__dirname, 'tsconfig.build.json'),
          })
        : esbuild({
            tsconfig: path.resolve(__dirname, 'tsconfig.build.json'),
            sourceMap: output.sourcemap,
            minify: true,
          }),
    ],
  };
}

function resolvePath(format, isDts) {
  return path.resolve(
    outputPath,
    `${pkg.name}${isDts ? '.d.ts' : `.${format}.js`}`,
  );
}
