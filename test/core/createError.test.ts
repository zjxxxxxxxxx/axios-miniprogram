import { describe, test, expect } from 'vitest';
import { checkStack } from 'scripts/test.utils';
import { createError, isAxiosError } from '@/core/createError';

describe('src/core/createError.ts', () => {
  test('应该支持空参数', () => {
    const c = {};
    const r = {} as any;
    const err = createError('error', c, r);

    expect(err.message).toBe('error');
    expect(err.config).toBe(c);
    expect(err.response).toBe(r);
    expect(checkStack(err)).toBeTruthy();
  });

  test('应该支持传入更多参数', () => {
    const c = {};
    const res = {};
    const req = {} as any;
    const err = createError('error', c, res as any, req);

    expect(err.message).toBe('error');
    expect(err.config).toBe(c);
    expect(err.response).toBe(res);
    expect(err.request).toBe(req);
  });

  test('应该正确判断 AxiosError', () => {
    expect(isAxiosError(0)).toBeFalsy();
    expect(isAxiosError(new Error())).toBeFalsy();
    expect(isAxiosError(createError('error', {}, {} as any))).toBeTruthy();
  });
});
