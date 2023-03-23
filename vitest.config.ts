import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import { __dirname } from './scripts/utils';

export default defineConfig({
  test: {
    root: resolve(__dirname),
    globals: true,
    include: ['./test/**/*.test.ts'],
  },
});
