import path from 'node:path';
import { defineConfig } from 'vitest/config';
import { __dirname } from './scripts/utils';

const resolve = (...paths) => path.resolve(__dirname, ...paths);

export default defineConfig({
  test: {
    root: __dirname,
    globals: true,
    alias: {
      '@': resolve('src'),
    },
    coverage: {
      provider: 'c8',
      reportsDirectory: resolve('test/coverage'),
      enabled: true,
    },
    include: ['./test/**/*.test.ts'],
  },
});
