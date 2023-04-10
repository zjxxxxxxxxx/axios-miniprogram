import { describe, test, expect } from 'vitest';
import Axios from '@/core/Axios';
import axios from '@/axios';
import defaults from '@/defaults';

describe('src/axios.ts', () => {
  test('应该有这些实例属性及方法', () => {
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
