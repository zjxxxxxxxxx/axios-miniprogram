import { describe, test, expect } from 'vitest';
import { createError, isAxiosError } from '@/request/createError';

describe('src/request/createError.ts', () => {
  test('应该支持空参数', () => {
    const c = {};
    const r = {} as any;
    const err = createError('error', c, r);

    expect(err.message).toBe('error');
    expect(err.config).toBe(c);
    expect(err.response).toBe(r);
  });

  test('应该支持传递更多参数', () => {
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
