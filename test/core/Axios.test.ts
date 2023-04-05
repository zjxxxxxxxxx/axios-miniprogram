import { describe, test, expect } from 'vitest';
import Axios from 'src/core/Axios';

describe('src/core/Axios.ts', () => {
  test('应该有这些静态属性', () => {
    expect(Axios.as).toEqual(['options', 'trace', 'connect']);
    expect(Axios.pas).toEqual(['head', 'get', 'delete']);
    expect(Axios.das).toEqual(['post', 'put']);
  });

  test('应该有这些实例属性', () => {
    const c = {
      baseURL: 'http://api.com',
    };
    const a = new Axios(c);

    expect(a.defaults).toEqual(c);
    expect(a.interceptors).toBeTypeOf('object');
    expect(a.request).toBeTypeOf('function');
    expect(a.getUri).toBeTypeOf('function');

    [...Axios.as, ...Axios.pas, ...Axios.das].forEach((k) => {
      expect(a[k]).toBeTypeOf('function');
    });
  });
});
