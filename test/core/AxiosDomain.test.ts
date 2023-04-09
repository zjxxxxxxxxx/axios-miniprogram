import { describe, test, expect, vi } from 'vitest';
import { ignore } from '@/helpers/ignore';
import AxiosDomain from '@/core/AxiosDomain';
import { AxiosResponse } from '@/core/Axios';

describe('src/core/AxiosDomain.ts', () => {
  test('应该有这些静态属性', () => {
    expect(AxiosDomain.as).toEqual(['options', 'trace', 'connect']);
    expect(AxiosDomain.asp).toEqual(['head', 'get', 'delete']);
    expect(AxiosDomain.asd).toEqual(['post', 'put']);
  });

  test('应该有这些实例属性', () => {
    const c = {
      baseURL: 'http://api.com',
    };
    const a = new AxiosDomain(c, vi.fn());

    expect(a.defaults).toEqual(c);
    expect(a.request).toBeTypeOf('function');

    [...AxiosDomain.as, ...AxiosDomain.asp, ...AxiosDomain.asd].forEach((k) => {
      expect(a[k]).toBeTypeOf('function');
    });
  });

  test('发送请求时 processRequest 应该被调用', () => {
    const p = vi.fn();
    const d = {
      baseURL: 'http://api.com',
    };
    const c = {
      url: 'test',
      params: {
        id: 1,
      },
      data: {
        id: 1,
      },
    };

    new AxiosDomain(d, p).request(c);

    expect(p).toBeCalled();
    expect(p.mock.calls[0][0]).toEqual({
      ...d,
      ...c,
    });
  });

  test('应该可以调用请求方法', () => {
    const cb = vi.fn();
    const d = {
      baseURL: 'http://api.com',
    };
    const u = 'test';
    const c = {
      params: {
        id: 1,
      },
      data: {
        id: 1,
      },
    };
    const a = new AxiosDomain(d, async (config) => {
      cb();

      expect(config.baseURL).toBe(d.baseURL);
      expect(config.url).toBe(u);
      expect(config.params).toEqual(c.params);
      expect(config.data).toEqual(c.data);

      return {} as AxiosResponse;
    });

    a.request(u, c);

    AxiosDomain.as.forEach((k) => a[k](u, c));
    AxiosDomain.asp.forEach((k) => a[k](u, c.params, ignore(c, 'params')));
    AxiosDomain.asd.forEach((k) => a[k](u, c.data, ignore(c, 'data')));

    const l =
      AxiosDomain.as.length +
      AxiosDomain.asp.length +
      AxiosDomain.asd.length +
      1;
    expect(cb.mock.calls.length).toBe(l);
  });

  test('应该可以直接传入 config 调用请求方法', () => {
    const cb = vi.fn();
    const d = {
      baseURL: 'http://api.com',
    };
    const c = {
      url: 'test',
      params: {
        id: 1,
      },
      data: {
        id: 1,
      },
    };
    const a = new AxiosDomain(d, async (config) => {
      cb();

      expect(config.baseURL).toBe(d.baseURL);
      expect(config.url).toBe(c.url);
      expect(config.params).toEqual(c.params);
      expect(config.data).toEqual(c.data);

      return {} as AxiosResponse;
    });

    a.request(c);

    AxiosDomain.as.forEach((k) => a[k](c.url, ignore(c, 'url')));
    AxiosDomain.asp.forEach((k) =>
      a[k](c.url, c.params, ignore(c, 'url', 'params')),
    );
    AxiosDomain.asd.forEach((k) =>
      a[k](c.url, c.data, ignore(c, 'url', 'data')),
    );

    const l =
      AxiosDomain.as.length +
      AxiosDomain.asp.length +
      AxiosDomain.asd.length +
      1;
    expect(cb.mock.calls.length).toBe(l);
  });

  test('应该支持深度合并 params', () => {
    const d = {
      baseURL: 'http://api.com',
    };
    const p = {
      v1: 1,
      v2: {
        v1: 1,
      },
    };
    const c = {
      params: {
        v2: {
          v2: 2,
        },
        v3: 3,
      },
    };

    const a = new AxiosDomain(d, async (config) => {
      expect(config.params).toEqual({
        v1: 1,
        v2: {
          v1: 1,
          v2: 2,
        },
        v3: 3,
      });

      return {} as AxiosResponse;
    });

    AxiosDomain.asp.forEach((k) => a[k]('test', p, c));
  });

  test('应该支持深度合并 data', () => {
    const ds = {
      baseURL: 'http://api.com',
    };
    const d = {
      v1: 1,
      v2: {
        v1: 1,
      },
    };
    const c = {
      data: {
        v2: {
          v2: 2,
        },
        v3: 3,
      },
    };

    const a = new AxiosDomain(ds, async (config) => {
      expect(config.data).toEqual({
        v1: 1,
        v2: {
          v1: 1,
          v2: 2,
        },
        v3: 3,
      });

      return {} as AxiosResponse;
    });

    AxiosDomain.asd.forEach((k) => a[k]('test', d, c));
  });
});
