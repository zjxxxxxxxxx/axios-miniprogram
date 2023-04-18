import { describe, test, expect } from 'vitest';
import { generateType } from '@/core/generateType';
import {
  requestMethodNames,
  requestMethodWithDataNames,
  requestMethodWithParamsNames,
} from '@/core/AxiosDomain';

describe('src/core/generateType.ts', () => {
  test('应该是一个 reuqest', () => {
    for (const a of [
      ...requestMethodNames,
      ...requestMethodWithParamsNames,
      ...requestMethodWithDataNames,
    ]) {
      expect(generateType({ method: a })).toBe('request');
    }
  });

  test('应该是一个 upload', () => {
    expect(generateType({ method: 'post', upload: true })).toBe('upload');
  });

  test('应该是一个 download', () => {
    expect(generateType({ method: 'get', download: true })).toBe('download');
  });
});
