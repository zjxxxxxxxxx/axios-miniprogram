import { describe, test, expect } from 'vitest';
import {
  PLAIN_METHODS,
  WITH_DATA_METHODS,
  WITH_PARAMS_METHODS,
} from '@/constants/methods';

describe('src/constants/methods.ts', () => {
  test('PLAIN_METHODS 应该有这些值', () => {
    expect(PLAIN_METHODS).toEqual(['options', 'trace', 'connect']);
  });

  test('WITH_PARAMS_METHODS 应该有这些值', () => {
    expect(WITH_PARAMS_METHODS).toEqual(['head', 'get', 'delete']);
  });

  test('WITH_DATA_METHODS 应该有这些值', () => {
    expect(WITH_DATA_METHODS).toEqual(['post', 'put', 'patch']);
  });
});
