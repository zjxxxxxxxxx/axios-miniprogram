import { describe, test, expect } from 'vitest';
import { assert, throwError } from 'src/helpers/error';

describe('测试 src/helpers/error.ts', () => {
  test('第一个参数为 true 时应该无事发生', () => {
    expect(assert(true, '')).toBeUndefined();
  });

  test('第一个参数为 false 时应该抛出异常', () => {
    expect(() => assert(false, '')).toThrowError();
  });

  test('应该抛出异常', () => {
    expect(() => throwError('')).toThrowError('[axios-miniprogram]: ');
    expect(() => throwError('error')).toThrowError(
      '[axios-miniprogram]: error',
    );
  });
});
