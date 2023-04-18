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

  const plugins: Plugin[] = [];
  if (isDts) {
    plugins.push(
      dtsPlugin({
        tsconfig: resolve('tsconfig.json'),
      }),
      patchTypePlugin([resolve('global.d.ts')]),
    );
  } else {
    plugins.push(
      esbuildPlugin({
        tsconfig: resolve('tsconfig.json'),
        sourceMap: output.sourcemap as boolean,
        target: 'es2015',
        minify: true,
      }),
    );
  }

  return {
    input: inputPath,
    output,
    plugins,
  };
}

function resolveOutput(format: string, isDts?: boolean) {
  return resolve(distPath, `${pkg.name}${isDts ? '.d.ts' : `.${format}.js`}`);
}

function patchTypePlugin(files: string[]): Plugin {
  return {
    name: 'patch-type',
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
