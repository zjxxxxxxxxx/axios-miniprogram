import { describe, test, expect } from 'vitest';
import Axios from 'src/core/Axios';

describe('src/core/Axios.ts', () => {
  test('应该有这些静态属性', () => {
    expect(Axios.as).toEqual(['options', 'trace', 'connect']);
    expect(Axios.asp).toEqual(['head', 'get', 'delete']);
    expect(Axios.asd).toEqual(['post', 'put']);
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
    expect(a.fork).toBeTypeOf('function');

    [...Axios.as, ...Axios.asp, ...Axios.asd].forEach((k) => {
      expect(a[k]).toBeTypeOf('function');
    });
  });
});
