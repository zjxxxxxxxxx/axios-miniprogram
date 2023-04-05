import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { mockAdapter } from 'scripts/test.utils';
import Axios from '../src/core/Axios';
import { CancelToken, isCancel } from '../src/core/cancel';
import { isAxiosError } from '../src/core/createError';
import { createAdapter } from '../src/adapter';
import defaults from '../src/defaults';
import axios from '../src/axios';

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

  test('应该有这些静态属性', () => {
    expect(axios.defaults).toBe(defaults);
    expect(axios.Axios).toBe(Axios);
    expect(axios.CancelToken).toBe(CancelToken);
    expect(axios.createAdapter).toBe(createAdapter);
    expect(axios.isCancel).toBe(isCancel);
    expect(axios.isAxiosError).toBe(isAxiosError);

    expect(axios.interceptors).toBeTypeOf('object');
    expect(axios.create).toBeTypeOf('function');
    expect(axios.request).toBeTypeOf('function');

    expect(axios.getUri).toBeTypeOf('function');

    [...Axios.as, ...Axios.pas, ...Axios.das].forEach((k) => {
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

    Axios.pas.forEach((a) => {
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

    Axios.das.forEach((a) => {
      axios[a]('test', d, c1).then((res) => {
        expect(res.data).toEqual(data);
      });
      axios[a]('test/:id', d, c2).then((res) => {
        expect(res.data).toEqual(data);
      });
    });
  });
});
