const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
  include: ['src', '__tests__'],
};
