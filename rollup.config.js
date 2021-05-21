import path from 'path';
import rimraf from 'rimraf';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { DEFAULT_EXTENSIONS } from '@babel/core';

import filterEmptyLines from './scripts/@rollup/plugin-filter-empty-lines';
import pkg from './package.json';

const entryFilePath = path.resolve(__dirname, 'src/index.ts');
const distPath = path.resolve(__dirname, 'dist');
const pkgName = pkg.name;

const extensions = [].concat(DEFAULT_EXTENSIONS, '.ts');
const plugins = [
  nodeResolve({
    extensions,
  }),
  typescript({
    useTsconfigDeclarationDir: true,
  }),
  babel({
    extensions,
    babelHelpers: 'bundled',
    comments: false,
  }),
  commonjs({
    include: /node_modules/,
  }),
  filterEmptyLines(),
];

function resolveOutputFilePath(format) {
  return path.resolve(distPath, format, `${pkgName}.js`);
}

function generateConfig(format) {
  return {
    input: entryFilePath,
    output: {
      file: resolveOutputFilePath(format),
      format,
      name: pkgName,
      exports: 'default',
      indent: false,
    },
    plugins,
  };
}

let run;
const promise = new Promise((resolve, reject) => {
  run = (err) => {
    if (err) {
      reject(err);
      return;
    }

    resolve([generateConfig('esm'), generateConfig('cjs')]);
  };
});

export default () => {
  rimraf(distPath, run);

  return promise;
};
