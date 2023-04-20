import { describe, test, expect } from 'vitest';
import axios from '@/axios';
import defaults from '@/defaults';
import { testEachMethods } from 'scripts/test.utils';

describe('src/axios.ts', () => {
  test('应该有这些实例属性及方法', () => {
    expect(axios.defaults).toBe(defaults);
    expect(axios.interceptors).toBeTypeOf('object');
    expect(axios.getUri).toBeTypeOf('function');
    expect(axios.fork).toBeTypeOf('function');
    expect(axios.request).toBeTypeOf('function');
  });

  testEachMethods('%s 应该是一个函数', (k) => {
    expect(axios[k]).toBeTypeOf('function');
  });
});
