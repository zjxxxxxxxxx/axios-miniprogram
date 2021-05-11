const runtimeVersion = require('./package.json').dependencies[
  '@babel/runtime'
].replace(/^[^0-9]*/, '');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '8',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/transform-runtime',
      {
        version: runtimeVersion,
      },
    ],
  ],
  exclude: 'node_modules/**',
};
