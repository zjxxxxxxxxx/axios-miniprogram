const [OFF, WARN, ERROR] = [0, 1, 2];

module.exports = {
  env: {
    es2021: true,
    node: 10,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/ban-types': OFF,
    '@typescript-eslint/no-non-null-assertion': OFF,
  },
};
