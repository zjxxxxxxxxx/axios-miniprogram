import { describe, test, expect, vi } from 'vitest';
import { ignore } from '@/helpers/ignore';
import {
  PLAIN_METHODS,
  WITH_DATA_METHODS,
  WITH_PARAMS_METHODS,
} from '@/constants/methods';
import AxiosDomain from '@/core/AxiosDomain';
import { AxiosResponse } from '@/core/Axios';
import { eachMethods } from 'scripts/test.utils';

describe('src/core/AxiosDomain.ts', () => {
  test('应该有这些实例属性', () => {
    const c = {
      baseURL: 'http://api.com',
    };
    const a = new AxiosDomain(c, vi.fn());

    expect(a.defaults).toEqual(c);
    expect(a.request).toBeTypeOf('function');

    eachMethods((k) => {
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

  test('请求方法应该支持空参数', () => {
    const cb = vi.fn();
    const a = new AxiosDomain({}, cb);

    a.request('test');

    PLAIN_METHODS.forEach((k) => a[k]('test'));
    WITH_PARAMS_METHODS.forEach((k) => a[k]('test'));
    WITH_DATA_METHODS.forEach((k) => a[k]('test'));

    const l =
      PLAIN_METHODS.length +
      WITH_PARAMS_METHODS.length +
      WITH_DATA_METHODS.length +
      1;
    expect(cb.mock.calls.length).toBe(l);
    cb.mock.calls.forEach(([config]) => expect(config.url).toBe('test'));
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

    PLAIN_METHODS.forEach((k) => a[k](u, c));
    WITH_PARAMS_METHODS.forEach((k) => a[k](u, c.params, ignore(c, 'params')));
    WITH_DATA_METHODS.forEach((k) => a[k](u, c.data, ignore(c, 'data')));

    const l =
      PLAIN_METHODS.length +
      WITH_PARAMS_METHODS.length +
      WITH_DATA_METHODS.length +
      1;
    expect(cb.mock.calls.length).toBe(l);
  });

  test('应该可以直接传递 config 调用请求方法', () => {
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

    PLAIN_METHODS.forEach((k) => a[k](c.url, ignore(c, 'url')));
    WITH_PARAMS_METHODS.forEach((k) =>
      a[k](c.url, c.params, ignore(c, 'url', 'params')),
    );
    WITH_DATA_METHODS.forEach((k) =>
      a[k](c.url, c.data, ignore(c, 'url', 'data')),
    );

    const l =
      PLAIN_METHODS.length +
      WITH_PARAMS_METHODS.length +
      WITH_DATA_METHODS.length +
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

    WITH_PARAMS_METHODS.forEach((k) => a[k]('test', p, c));
  });

  test('应该只取传入的 data', () => {
    const ds = {
      baseURL: 'http://api.com',
    };
    const d = {
      v: 1,
    };
    const c = {
      v: 2,
    };

    const a = new AxiosDomain(ds, async (config) => {
      expect(config.data).toEqual({
        v: 1,
      });

      return {} as AxiosResponse;
    });

    WITH_DATA_METHODS.forEach((k) => a[k]('test', d, c));
  });

  test('应该支持多种类型 data', () => {
    const ds = {
      baseURL: 'http://api.com',
    };

    const str = '11';
    const obj = {};
    const buff = new ArrayBuffer(0);

    const testStr = new AxiosDomain(ds, async (config) => {
      expect(config.data).toBe(str);

      return {} as AxiosResponse;
    });
    const testObj = new AxiosDomain(ds, async (config) => {
      expect(config.data).toBe(obj);

      return {} as AxiosResponse;
    });
    const testBuff = new AxiosDomain(ds, async (config) => {
      expect(config.data).toBe(buff);

      return {} as AxiosResponse;
    });

    WITH_DATA_METHODS.forEach((k) => {
      testStr[k]('test', str);
      testObj[k]('test', obj);
      testBuff[k]('test', buff);
    });
  });
});
