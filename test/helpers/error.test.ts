import { describe, test, expect } from 'vitest';
import { captureError, cleanedStack } from 'scripts/test.utils';
import { assert, throwError, cleanStack } from 'src/helpers/error';

describe('src/helpers/error.ts', () => {
  test('第一个参数为 true 时应该无事发生', () => {
    expect(assert(true, '')).toBeUndefined();
  });

  test('第一个参数为 false 时应该抛出异常', () => {
    expect(() => assert(false, '')).toThrowError();
    expect(cleanedStack(captureError(() => assert(false, '')))).toBeTruthy();
  });

  test('应该抛出异常', () => {
    expect(() => throwError('')).toThrowError('[axios-miniprogram]: ');
    expect(() => throwError('error')).toThrowError(
      '[axios-miniprogram]: error',
    );
    expect(cleanedStack(captureError(() => throwError('error')))).toBeTruthy();
  });

  test('应该清掉多余的错误栈', () => {
    const ce = () => new Error();
    const error = ce();

    expect(cleanedStack(error)).toBeFalsy();

    cleanStack(error);

    expect(cleanedStack(error)).toBeTruthy();
  });
});
