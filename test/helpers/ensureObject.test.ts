import { describe, test, expect } from 'vitest';
import { ensureObject } from '@/helpers/ensureObject';

describe('src/helpers/ensureObject.ts', () => {
  test('应该始终返回对象', () => {
    expect(ensureObject()).toEqual({});
    expect(ensureObject(1)).toEqual({});
    expect(ensureObject('')).toEqual({});
    expect(ensureObject([])).toEqual({});
    expect(ensureObject(new Date())).toEqual({});
  });

  test('应该返回对象参数', () => {
    expect(ensureObject({ a: 1 })).toEqual({ a: 1 });
  });
});
