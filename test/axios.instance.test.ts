import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { mockAdapter } from 'scripts/test.utils';
import Axios from '@/core/Axios';
import AxiosDomain from '@/core/AxiosDomain';
import defaults from '@/defaults';
import axios from '@/axios';

describe('src/axios.ts', () => {
  const data = {
    result: null,
  };

  beforeAll(() => {
    axios.defaults.baseURL = 'http://api.com';
  });

  afterAll(() => {
    axios.defaults.baseURL = undefined;
  });

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

  test('应该可以发送普通别名请求', () => {
    const c = {
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test');
        },
        data,
      }),
    };

    Axios.as.forEach((a) => {
      axios[a]('test', c).then((res) => {
        expect(res.data).toEqual(data);
      });
    });
  });

  test('应该可以发送带参数的别名请求', () => {
    const p = { id: 1 };
    const c1 = {
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test?id=1');
          expect(config.params).toEqual(p);
        },
        data,
      }),
    };
    const c2 = {
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test/1?id=1');
          expect(config.params).toEqual(p);
        },
        data,
      }),
    };

    Axios.asp.forEach((a) => {
      axios[a]('test', p, c1).then((res) => {
        expect(res.data).toEqual(data);
      });
      axios[a]('test/:id', p, c2).then((res) => {
        expect(res.data).toEqual(data);
      });
    });
  });

  test('应该可以发送带数据的别名请求', () => {
    const d = { id: 1 };
    const c1 = {
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test');
          expect(config.data).toEqual(d);
        },
        data,
      }),
    };
    const c2 = {
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test/1');
          expect(config.data).toEqual(d);
        },
        data,
      }),
    };

    Axios.asd.forEach((a) => {
      axios[a]('test', d, c1).then((res) => {
        expect(res.data).toEqual(data);
      });
      axios[a]('test/:id', d, c2).then((res) => {
        expect(res.data).toEqual(data);
      });
    });
  });

  test('应该可以获取 URI', () => {
    expect(
      axios.getUri({
        url: 'test',
      }),
    ).toBe('test');
  });

  test('应该可以派生领域', () => {
    const a = axios.fork({
      baseURL: 'test',
    });
    expect(a.defaults.baseURL).toBe('http://api.com/test');
    expect(a instanceof AxiosDomain).toBeTruthy();
  });
});
