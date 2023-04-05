import { describe, test, expect } from 'vitest';
import { checkStack } from 'scripts/test.utils';
import { createError, isAxiosError } from 'src/core/createError';

describe('src/core/createError.ts', () => {
  test('应该支持空参数', () => {
    const c = {};
    const err = createError('error', c);

    expect(err.message).toBe('error');
    expect(err.config).toBe(c);
    expect(checkStack(err)).toBeTruthy();
  });

  test('应该支持传入更多参数', () => {
    const c = {};
    const req = {};
    const res = {};
    const err = createError('error', c, req, res as any);

    expect(err.message).toBe('error');
    expect(err.config).toBe(c);
    expect(err.request).toBe(req);
    expect(err.response).toBe(res);
  });

  test('应该正确判断 AxiosError', () => {
    expect(isAxiosError(0)).toBeFalsy();
    expect(isAxiosError(new Error())).toBeFalsy();
    expect(isAxiosError(createError('error', {}))).toBeTruthy();
  });
});
