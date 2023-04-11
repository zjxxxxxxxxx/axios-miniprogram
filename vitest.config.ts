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
      provider: 'istanbul',
      reportsDirectory: resolve('test/.coverage'),
      enabled: false,
      include: ['src/**/*.ts'],
    },
    include: ['test/**/*.test.ts'],
  },
});
