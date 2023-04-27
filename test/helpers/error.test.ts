import { describe, test, expect } from 'vitest';
import { assert, throwError } from '@/helpers/error';

describe('src/helpers/error.ts', () => {
  test('第一个参数为 true 时应该无事发生', () => {
    expect(assert(true, '')).toBeUndefined();
  });

  test('第一个参数为 false 时应该抛出异常', () => {
    expect(() => assert(false, '')).toThrowError();
  });

  test('应该抛出异常', () => {
    expect(() => throwError('')).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: "',
    );
    expect(() => throwError('error')).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: error"',
    );
  });
});
