import { describe, test, expect } from 'vitest';
import { transformURL } from '@/request/transformURL';

describe('src/request/transformURL.ts', () => {
  test('应该支持空配置', () => {
    expect(transformURL({})).toBe('');
    expect(transformURL({ baseURL: 'http://api.com' })).toBe('http://api.com');
    expect(transformURL({ url: 'test' })).toBe('/test');
  });

  test('应该合并 URL', () => {
    expect(
      transformURL({
        baseURL: 'http://api.com',
        url: 'test',
      }),
    ).toBe('http://api.com/test');
    expect(
      transformURL({
        baseURL: 'http://api.com',
        url: '/test',
      }),
    ).toBe('http://api.com/test');
  });

  test('应该支持绝对路径', () => {
    expect(
      transformURL({
        baseURL: 'http://api.com',
        url: 'http://api2.com',
      }),
    ).toBe('http://api2.com');
  });

  test('应该支持动态 URL', () => {
    expect(
      transformURL({
        baseURL: 'http://api.com',
        url: 'test/:name/:type',
        params: {
          name: 'axios',
          type: 0,
        },
      }),
    ).toBe('http://api.com/test/axios/0');
    expect(
      transformURL({
        baseURL: 'http://api.com',
        url: 'test/:name/:type',
        data: {
          name: 'axios',
          type: 0,
        },
      }),
    ).toBe('http://api.com/test/axios/0');
  });

  test('应该支持自定义参数系列化器', () => {
    expect(
      transformURL({
        baseURL: 'http://api.com',
        url: 'test',
        paramsSerializer: () => 'type=0',
      }),
    ).toBe('http://api.com/test?type=0');
    expect(
      transformURL({
        baseURL: 'http://api.com',
        url: 'test?name=axios',
        paramsSerializer: () => 'type=0',
      }),
    ).toBe('http://api.com/test?name=axios&type=0');
  });
});
