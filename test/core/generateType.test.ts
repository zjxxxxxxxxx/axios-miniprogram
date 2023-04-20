import { describe, test, expect } from 'vitest';
import { generateType } from '@/core/generateType';
import { testEachMethods } from 'scripts/test.utils';

describe('src/core/generateType.ts', () => {
  testEachMethods('%s 应该是一个 reuqest', (k) => {
    expect(generateType({ method: k })).toBe('request');
  });

  test('应该是一个 upload', () => {
    expect(generateType({ method: 'post', upload: true })).toBe('upload');
  });

  test('应该是一个 download', () => {
    expect(generateType({ method: 'get', download: true })).toBe('download');
  });
});
