const path = require('path');
const rimraf = require('rimraf');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const { DEFAULT_EXTENSIONS } = require('@babel/core');

const pkg = require('./package.json');

const entryFilePath = path.resolve(__dirname, 'src/index.ts');
const buildPath = path.resolve(__dirname, 'dist');
const pkgName = pkg.name;

function resolveOutputFilePath(format) {
  return path.resolve(buildPath, format, pkgName + '.js');
}

const extensions = [].concat(DEFAULT_EXTENSIONS, '.ts');

const basePlugins = [
  nodeResolve({
    extensions,
  }),
  typescript({}),
  babel({
    extensions,
    babelHelpers: 'runtime',
  }),
  commonjs(),
];

function createConfig(format) {
  const isUmd = format === 'umd';
  const plugins = [].concat(basePlugins);

  if (isUmd) {
    plugins.push(terser());
  }

  return {
    input: entryFilePath,
    output: {
      file: resolveOutputFilePath(format),
      format,
      name: pkgName,
      exports: 'default',
    },
    external(id) {
      if (isUmd) {
        return false;
      }

      return /@babel\/runtime/.test(id);
    },
    plugins,
  };
}

let run;
const promise = new Promise(function (resolve, reject) {
  run = function (error) {
    if (error) {
      reject(error);
    }

    resolve([createConfig('esm'), createConfig('cjs'), createConfig('umd')]);
  };
});

module.exports = function () {
  rimraf(buildPath, run);
  return promise;
};
