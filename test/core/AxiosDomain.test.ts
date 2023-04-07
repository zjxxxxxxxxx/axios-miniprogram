import { describe, test, expect, vi } from 'vitest';
import AxiosDomain, { AxiosDomainRequest } from 'src/core/AxiosDomain';
import { ignore } from 'src/helpers/ignore';

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

  test('应该可以调用这些方法', () => {
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
    const a = new AxiosDomain(d, ((config) => {
      cb();

      expect(config.baseURL).toBe(d.baseURL);
      expect(config.url).toBe(c.url);
      expect(config.params).toEqual(c.params);
      expect(config.data).toEqual(c.data);
    }) as AxiosDomainRequest);

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

    const a = new AxiosDomain(d, ((config) => {
      expect(config.params).toEqual({
        v1: 1,
        v2: {
          v1: 1,
          v2: 2,
        },
        v3: 3,
      });
    }) as AxiosDomainRequest);

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

    const a = new AxiosDomain(ds, ((config) => {
      expect(config.data).toEqual({
        v1: 1,
        v2: {
          v1: 1,
          v2: 2,
        },
        v3: 3,
      });
    }) as AxiosDomainRequest);

    AxiosDomain.asd.forEach((k) => a[k]('test', d, c));
  });
});
