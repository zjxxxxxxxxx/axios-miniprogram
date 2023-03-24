import path from 'node:path';
import esbuildPlugin from 'rollup-plugin-esbuild';
import dtsPlugin from 'rollup-plugin-dts';
import { __dirname, distPath, getPkgJSON } from './scripts/utils.js';
import { readFileSync } from 'node:fs';

const pkg = getPkgJSON();
const inputPath = path.resolve(__dirname, 'src/index.ts');

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

/**
 *
 * @param {*} format
 * @returns {import('rollup').InputOptions}
 */
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
        ? [
            dtsPlugin({
              tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            }),
            compleTypePlugin([path.resolve(__dirname, 'global.d.ts')]),
          ]
        : esbuildPlugin({
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            sourceMap: output.sourcemap,
            minify: true,
          }),
    ],
  };
}

function resolvePath(format, isDts) {
  return path.resolve(
    distPath,
    `${pkg.name}${isDts ? '.d.ts' : `.${format}.js`}`,
  );
}

function compleTypePlugin(files) {
  return {
    name: 'comple-type',
    renderChunk: (code) =>
      `${files
        .map(
          (file) =>
            `// ${file.replace(__dirname, '')}\n${readFileSync(
              file,
            ).toString()}\n// ${file.replace(__dirname, '')} end\n`,
        )
        .join('')}\n${code}`,
  };
}
