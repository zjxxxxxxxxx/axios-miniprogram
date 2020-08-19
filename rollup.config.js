import fs from 'fs';
import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript2 from 'rollup-plugin-typescript2';

function removeDir(name) {
  try {
    if (fs.statSync(name).isFile()) {
      fs.unlinkSync(name);
    } else {
      fs.readdirSync(name).forEach((dir) => removeDir(path.join(name, dir)));
      fs.rmdirSync(name);
    }
  } catch (err) {}
}

export default function () {
  removeDir('package');
  removeDir('types');
  const extensions = ['.ts'];
  return [
    {
      input: 'src/index.ts',
      output: {
        file: 'es/index.js',
        format: 'esm',
        indent: false,
      },
      plugins: [
        nodeResolve({ extensions }),
        typescript2({ useTsconfigDeclarationDir: true }),
        commonjs({
          include: /node_modules/,
        }),
        babel({
          extensions,
          babelHelpers: 'bundled',
        }),
      ],
    },
    {
      input: 'src/index.ts',
      output: {
        file: 'lib/index.js',
        format: 'cjs',
        indent: false,
      },
      plugins: [
        nodeResolve({ extensions }),
        typescript2({ useTsconfigDeclarationDir: true }),
        commonjs({
          include: /node_modules/,
        }),
        babel({
          extensions,
          babelHelpers: 'bundled',
        }),
      ],
    },
  ];
}
