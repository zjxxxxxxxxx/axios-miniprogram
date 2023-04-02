import { describe, test, expect } from 'vitest';
import { cleanedStack } from 'scripts/test.utils';
import { createError } from 'src/core/createError';

describe('src/core/createError.ts', () => {
  test('应该支持空参数', () => {
    const config = {};
    const axiosError = createError('error', config);

    expect(axiosError.isAxiosError).toBeTruthy();
    expect(axiosError.message).toBe('error');
    expect(axiosError.config).toBe(config);
    expect(cleanedStack(axiosError)).toBeTruthy();
  });

  test('应该支持传入更多参数', () => {
    const config = {};
    const request = {};
    const response = {};
    const axiosError = createError('error', config, request, response as any);

    expect(axiosError.message).toBe('error');
    expect(axiosError.config).toBe(config);
    expect(axiosError.request).toBe(request);
    expect(axiosError.response).toBe(response);
  });
});
