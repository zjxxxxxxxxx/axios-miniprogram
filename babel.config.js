module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'auto',
      },
    ],
    '@babel/preset-typescript',
  ],
  exclude: 'node_modules/**',
};
