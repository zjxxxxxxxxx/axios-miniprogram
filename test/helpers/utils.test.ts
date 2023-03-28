import { describe, test, expect } from 'vitest';
import {
  assert,
  deepMerge,
  omit,
  pick,
  throwError,
} from '../../src/helpers/utils';

describe('对 src/helpers/utils.ts 进行测试', () => {
  test('测试 assert() 是否符合预期', () => {
    expect(assert(true, '')).toBeUndefined();
    expect(() => assert(false, '')).toThrow();
    expect(() => assert(false, 'msg')).toThrowError('[axios-miniprogram]: msg');
  });

  test('测试 deepMerge() 是否符合预期', () => {
    expect(deepMerge({})).toEqual({});
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    expect(deepMerge({ a: { a: 1 } }, { a: { b: 2 } })).toEqual({
      a: { a: 1, b: 2 },
    });
    expect(deepMerge({ a: { a: 1, b: 1 } }, { a: { a: 2, b: 2 } })).toEqual({
      a: { a: 2, b: 2 },
    });
    expect(deepMerge({ a: { a: 1 } }, { a: 2 })).toEqual({
      a: 2,
    });
  });

  test('测试 omit() 是否符合预期', () => {
    expect(omit({})).toEqual({});
    expect(omit({ a: 1, b: 1 }, 'a')).toEqual({ b: 1 });
    expect(omit({ a: 1, b: 1 }, 'a', 'b')).toEqual({});
  });

  test('测试 pick() 是否符合预期', () => {
    expect(pick({})).toEqual({});
    expect(pick({ a: 1, b: 1 }, 'a')).toEqual({ a: 1 });
    expect(pick({ a: 1, b: 1 }, 'a', 'b')).toEqual({ a: 1, b: 1 });
  });

  test('测试 throwError() 是否符合预期', () => {
    expect(() => throwError('')).toThrowError('[axios-miniprogram]: ');
    expect(() => throwError('msg')).toThrowError('[axios-miniprogram]: msg');
    expect(() => throwError(' msg ')).toThrowError(
      '[axios-miniprogram]:  msg ',
    );
  });
});
