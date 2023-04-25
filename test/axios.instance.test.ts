import { describe, test, expect, vi } from 'vitest';
import { mockAdapter, testEachMethods } from 'scripts/test.utils';
import {
  PLAIN_METHODS,
  WITH_DATA_METHODS,
  WITH_PARAMS_METHODS,
} from '@/constants/methods';
import defaults from '@/defaults';
import axios from '@/axios';

describe('src/axios.ts', () => {
  const data = { result: null };

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

  test('应该可以发送普通别名请求', () => {
    const c = {
      baseURL: 'http://api.com',
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test');
        },
        data,
      }),
    };

    PLAIN_METHODS.forEach((a) => {
      axios[a]('test', c).then((res) => {
        expect(res.data).toEqual(data);
      });
    });
  });

  test('应该可以发送带参数的别名请求', () => {
    const p = { id: 1 };
    const c1 = {
      baseURL: 'http://api.com',
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test?id=1');
          expect(config.params).toEqual(p);
        },
        data,
      }),
    };
    const c2 = {
      baseURL: 'http://api.com',
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test/1');
          expect(config.params).toEqual({});
        },
        data,
      }),
    };

    WITH_PARAMS_METHODS.forEach((a) => {
      axios[a]('test', p, c1).then((res) => {
        expect(res.data).toEqual(data);
      });
      axios[a]('test/:id', { ...p }, c2).then((res) => {
        expect(res.data).toEqual(data);
      });
    });
  });

  test('应该可以发送带数据的别名请求', () => {
    const d = { id: 1 };
    const c1 = {
      baseURL: 'http://api.com',
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test');
          expect(config.data).toEqual(d);
        },
        data,
      }),
    };
    const c2 = {
      baseURL: 'http://api.com',
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test/1');
          expect(config.data).toEqual(d);
        },
        data,
      }),
    };

    WITH_DATA_METHODS.forEach((a) => {
      axios[a]('test', d, c1).then((res) => {
        expect(res.data).toEqual(data);
      });
      axios[a]('test/:id', d, c2).then((res) => {
        expect(res.data).toEqual(data);
      });
    });
  });

  test('应该支持添加/移除请求拦截器', async () => {
    const cb = vi.fn((v) => v);

    const id = axios.interceptors.request.use(cb);
    await axios.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(1);

    await axios.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(2);

    axios.interceptors.request.eject(id);
    await axios.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(2);
  });

  test('应该支持添加/移除响应拦截器', async () => {
    const cb = vi.fn((v) => v);

    const id = axios.interceptors.response.use(cb);
    await axios.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(1);

    await axios.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(2);

    axios.interceptors.response.eject(id);
    await axios.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(2);
  });

  test('应该可以获取 URI', () => {
    expect(axios.getUri({ url: 'test' })).toBe('test');
    expect(axios.getUri({ url: 'test', params: { id: 1 } })).toBe('test?id=1');
    expect(axios.getUri({ url: 'test', paramsSerializer: () => 'id=1' })).toBe(
      'test?id=1',
    );
  });
});
