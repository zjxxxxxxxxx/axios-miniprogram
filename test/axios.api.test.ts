import { describe, test, expect } from 'vitest';
import Axios from '@/core/Axios';
import { CancelToken, isCancel } from '@/core/cancel';
import { isAxiosError } from '@/core/createError';
import { createAdapter } from '@/adapter';
import axios from '@/axios';

describe('src/axios.ts', () => {
  test('应该有这些静态属性', () => {
    expect(axios.Axios).toBe(Axios);
    expect(axios.CancelToken).toBe(CancelToken);
    expect(axios.create).toBeTypeOf('function');
    expect(axios.createAdapter).toBe(createAdapter);
    expect(axios.isCancel).toBe(isCancel);
    expect(axios.isAxiosError).toBe(isAxiosError);
  });
});
