import { describe, test, expect } from 'vitest';
import { captureError, checkStack } from 'scripts/test.utils';
import { assert, throwError, cleanStack } from '@/helpers/error';

describe('src/helpers/error.ts', () => {
  test('第一个参数为 true 时应该无事发生', () => {
    expect(assert(true, '')).toBeUndefined();
  });

  test('第一个参数为 false 时应该抛出异常', () => {
    expect(() => assert(false, '')).toThrowError();
    expect(checkStack(captureError(() => assert(false, '')))).toBeTruthy();
  });

  test('应该抛出异常', () => {
    expect(() => throwError('')).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: "',
    );
    expect(() => throwError('error')).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: error"',
    );
    expect(checkStack(captureError(() => throwError('error')))).toBeTruthy();
  });

  test('应该支持空错误栈', () => {
    const ce = () => {
      const error = new Error();
      error.stack = undefined;
      return error;
    };
    const error = ce();

    cleanStack(error);

    expect(checkStack(error)).toBeTruthy();
    expect(error.stack).toBeUndefined();
  });

  test('应该清掉多余的错误栈', () => {
    const ce = () => new Error();
    const error = ce();

    expect(checkStack(error)).toBeFalsy();

    cleanStack(error);

    expect(checkStack(error)).toBeTruthy();
  });
});
