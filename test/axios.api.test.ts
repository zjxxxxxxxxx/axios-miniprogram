import { describe, test, expect } from 'vitest';
import Axios from '@/core/Axios';
import { CancelToken, isCancel } from '@/core/cancel';
import { isAxiosError } from '@/core/createError';
import { createAdapter } from '@/adapter';
import axios from '@/axios';
import defaults from '@/defaults';

describe('src/axios.ts', () => {
  test('应该有这些静态属性', () => {
    expect(axios.Axios).toBe(Axios);
    expect(axios.CancelToken).toBe(CancelToken);
    expect(axios.create).toBeTypeOf('function');
    expect(axios.createAdapter).toBe(createAdapter);
    expect(axios.isCancel).toBe(isCancel);
    expect(axios.isAxiosError).toBe(isAxiosError);
  });

  test('应该可以创建实例', () => {
    const i2 = axios.create({
      baseURL: 'http://api.com',
    });

    expect(i2.defaults).toEqual({ ...defaults, baseURL: 'http://api.com' });
    expect(i2.interceptors).toBeTypeOf('object');
    expect(i2.getUri).toBeTypeOf('function');
    expect(i2.fork).toBeTypeOf('function');
    expect(i2.request).toBeTypeOf('function');

    [...Axios.as, ...Axios.asp, ...Axios.asd].forEach((k) => {
      expect(i2[k]).toBeTypeOf('function');
    });
  });

  test('创建的实例应该有这些实例属性及方法', () => {
    expect(axios.defaults).toBe(defaults);
    expect(axios.interceptors).toBeTypeOf('object');
    expect(axios.getUri).toBeTypeOf('function');
    expect(axios.fork).toBeTypeOf('function');
    expect(axios.request).toBeTypeOf('function');

    [...Axios.as, ...Axios.asp, ...Axios.asd].forEach((k) => {
      expect(axios[k]).toBeTypeOf('function');
    });
  });
});
