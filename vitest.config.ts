import { defineConfig } from 'vitest/config';
import { __dirname, resolve } from './scripts/utils';

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
