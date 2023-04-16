import { readFileSync } from 'node:fs';
import { RollupOptions, OutputOptions, Plugin, ModuleFormat } from 'rollup';
import esbuildPlugin from 'rollup-plugin-esbuild';
import dtsPlugin from 'rollup-plugin-dts';
import { __dirname, distPath, getPkgJSON, resolve } from './scripts/utils';

const pkg = getPkgJSON();
const inputPath = resolve('src/index.ts');

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

function buildConfig(format: ModuleFormat | 'dts'): RollupOptions {
  const isDts = format === 'dts';
  const output: OutputOptions = {
    file: resolveOutput(format, isDts),
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
              tsconfig: resolve('tsconfig.json'),
            }),
            compleTypePlugin([resolve('global.d.ts')]),
          ]
        : esbuildPlugin({
            tsconfig: resolve('tsconfig.json'),
            sourceMap: output.sourcemap as boolean,
            target: 'es2015',
            minify: true,
          }),
    ],
  };
}

function resolveOutput(format: string, isDts?: boolean) {
  return resolve(distPath, `${pkg.name}${isDts ? '.d.ts' : `.${format}.js`}`);
}

function compleTypePlugin(files: string[]): Plugin {
  return {
    name: 'comple-type',
    renderChunk: (code) =>
      `${files
        .map(
          (file) =>
            `// ${file.replace(__dirname, '')}\n${readFileSync(
              file,
            ).toString()}\n// ${file.replace(__dirname, '')} end`,
        )
        .join('\n')}\n${code}`,
  };
}
