import { describe, test, expect, vi } from 'vitest';
import {
  mockAdapter,
  mockAdapterError,
  mockAdapterFail,
  testEachMethods,
} from 'scripts/test.utils';
import {
  PLAIN_METHODS,
  WITH_DATA_METHODS,
  WITH_PARAMS_METHODS,
} from '@/constants/methods';
import Axios from '@/core/Axios';
import axios from '@/axios';

describe('src/core/Axios.ts', () => {
  const data = {
    result: null,
  };
  const axiosObj = new Axios({
    baseURL: 'http://api.com',
  });

  test('应该有这些实例属性及方法', () => {
    const c = {
      baseURL: 'http://api.com',
    };

    expect(axiosObj.defaults).toEqual(c);
    expect(axiosObj.interceptors).toBeTypeOf('object');
    expect(axiosObj.request).toBeTypeOf('function');
    expect(axiosObj.use).toBeTypeOf('function');
  });

  testEachMethods('%s 应该是一个函数', (k) => {
    expect(axiosObj[k]).toBeTypeOf('function');
  });

  test('应该可以发送普通别名请求', () => {
    const axiosObj = new Axios({
      adapter: mockAdapter({
        data,
      }),
    });
    const c = {
      baseURL: 'https://api.com',
    };

    PLAIN_METHODS.forEach((a) => {
      axiosObj[a]('test').then((res) => {
        expect(res.config.baseURL).toBeUndefined();
        expect(res.data).toEqual(data);
      });
      axiosObj[a]('test', c).then((res) => {
        expect(res.config.baseURL).toBe('https://api.com');
        expect(res.data).toEqual(data);
      });
    });
  });

  test('应该可以发送带参数的别名请求', () => {
    const axiosObj = new Axios({
      adapter: mockAdapter({
        data,
      }),
      baseURL: 'http://api.com',
    });
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
          expect(config.url).toBe('http://api.com/test/1');
          expect(config.params).toEqual({});
        },
        data,
      }),
    };

    WITH_PARAMS_METHODS.forEach((a) => {
      axiosObj[a]('test').then((res) => {
        expect(res.data).toEqual(data);
      });
      axiosObj[a]('test', p).then((res) => {
        expect(res.data).toEqual(data);
      });
      axiosObj[a]('test', p, c1).then((res) => {
        expect(res.data).toEqual(data);
      });
      axiosObj[a]('test/:id', { ...p }, c2).then((res) => {
        expect(res.data).toEqual(data);
      });
    });
  });

  test('应该可以发送带数据的别名请求', () => {
    const axiosObj = new Axios({
      adapter: mockAdapter({
        data,
      }),
      baseURL: 'http://api.com',
    });
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

    WITH_DATA_METHODS.forEach((a) => {
      axiosObj[a]('test').then((res) => {
        expect(res.data).toEqual(data);
      });
      axiosObj[a]('test', d).then((res) => {
        expect(res.data).toEqual(data);
      });
      axiosObj[a]('test', d, c1).then((res) => {
        expect(res.data).toEqual(data);
      });
      axiosObj[a]('test/:id', d, c2).then((res) => {
        expect(res.data).toEqual(data);
      });
    });
  });

  test('应该支持错误处理', async () => {
    const e1 = vi.fn();
    const e2 = vi.fn();
    const c1 = {
      adapter: mockAdapterError(),
      url: 'test',
      errorHandler: e1,
    };
    const c2 = {
      adapter: mockAdapterFail(),
      url: 'test',
      errorHandler: e2,
    };

    try {
      await axiosObj.request(c1);
    } catch (err) {
      expect(e1).toBeCalled();
      expect(e1.mock.calls[0][0]).toBe(err);
      expect(axios.isAxiosError(err)).toBeTruthy();
    }

    try {
      await axiosObj.request(c2);
    } catch (err) {
      expect(e2).toBeCalled();
      expect(e2.mock.calls[0][0]).toBe(err);
      expect(axios.isAxiosError(err)).toBeTruthy();
    }
  });

  test('应该支持异步错误处理', async () => {
    const e1 = vi.fn();
    const e2 = vi.fn();
    const c1 = {
      adapter: mockAdapterError(),
      url: 'test',
      errorHandler: async (err: unknown) => {
        e1(err);
        return Promise.reject(err);
      },
    };
    const c2 = {
      adapter: mockAdapterFail(),
      url: 'test',
      errorHandler: async (err: unknown) => {
        e2(err);
        return Promise.reject(err);
      },
    };

    try {
      await axiosObj.request(c1);
    } catch (err) {
      expect(e1).toBeCalled();
      expect(e1.mock.calls[0][0]).toBe(err);
      expect(axios.isAxiosError(err)).toBeTruthy();
    }

    try {
      await axiosObj.request(c2);
    } catch (err) {
      expect(e2).toBeCalled();
      expect(e2.mock.calls[0][0]).toBe(err);
      expect(axios.isAxiosError(err)).toBeTruthy();
    }
  });

  test('应该支持添加/移除请求拦截器', async () => {
    const cb = vi.fn((v) => v);

    const id = axiosObj.interceptors.request.use(cb);
    await axiosObj.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(1);

    await axiosObj.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(2);

    axiosObj.interceptors.request.eject(id);
    await axiosObj.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(2);
  });

  test('添加多个请求拦截器时应该按添加顺序从后往前依次执行', () => {
    const axiosObj = new Axios({});

    const cb1 = vi.fn((v) => {
      expect(v.params.index).toBe(2);
      v.params.index = 3;
      return v;
    });
    const cb2 = vi.fn((v) => {
      expect(v.params.index).toBe(1);
      v.params.index = 2;
      return v;
    });
    const cb3 = vi.fn((v) => {
      expect(v.params.index).toBe(0);
      v.params.index = 1;
      return v;
    });

    axiosObj.interceptors.request.use(cb1);
    axiosObj.interceptors.request.use(cb2);
    axiosObj.interceptors.request.use(cb3);

    axiosObj.request('/test', {
      adapter: (config) => {
        expect(config.params!.index).toBe(3);
      },
      params: {
        index: 0,
      },
    });
  });

  test('请求拦截器应该支持抛出异常', async () => {
    const axiosObj = new Axios({});
    const c = {
      adapter: vi.fn(),
      url: 'test',
      method: 'get' as const,
    };
    const body = (v: any) => {
      throw { ...v, throw: true };
    };
    const res1 = vi.fn(body);
    const rej1 = vi.fn(body);
    const res2 = vi.fn(body);
    const rej2 = vi.fn(body);

    axiosObj.interceptors.request.use(res1, rej1);
    axiosObj.interceptors.request.use(res2, rej2);

    try {
      await axiosObj.request(c);
    } catch (err) {
      expect(err).toEqual({ ...c, throw: true });
    }

    expect(c.adapter).not.toBeCalled();
    expect(res1).not.toBeCalled();
    expect(rej1).toBeCalled();
    expect(rej1.mock.calls[0][0]).toEqual({ ...c, throw: true });
    expect(res2).toBeCalled();
    expect(res2.mock.calls[0][0]).toEqual(c);
    expect(rej2).not.toBeCalled();
  });

  test('应该支持添加/移除响应拦截器', async () => {
    const cb = vi.fn((v) => v);

    const id = axiosObj.interceptors.response.use(cb);
    await axiosObj.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(1);

    await axiosObj.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(2);

    axiosObj.interceptors.response.eject(id);
    await axiosObj.request('/test', {
      adapter: mockAdapter(),
    });

    expect(cb.mock.calls.length).toBe(2);
  });

  test('添加多个响应拦截器时应该按添加顺序从前往后依次执行', async () => {
    const axiosObj = new Axios({});

    const cb1 = vi.fn((v) => {
      expect(v.data.index).toBe(0);
      v.data.index = 1;
      return v;
    });
    const cb2 = vi.fn((v) => {
      expect(v.data.index).toBe(1);
      v.data.index = 2;
      return v;
    });
    const cb3 = vi.fn((v) => {
      expect(v.data.index).toBe(2);
      v.data.index = 3;
      return v;
    });

    axiosObj.interceptors.response.use(cb1);
    axiosObj.interceptors.response.use(cb2);
    axiosObj.interceptors.response.use(cb3);

    const response = await axiosObj.request<{ index: 0 }>('/test', {
      adapter: mockAdapter({ data: { index: 0 } }),
    });

    expect(response.data.index).toBe(3);
  });

  test('响应拦截器应该支持抛出异常', async () => {
    const axiosObj = new Axios({});
    const c = { adapter: vi.fn(mockAdapter()), url: 'test' };
    const body = () => {
      throw { throw: true };
    };
    const res1 = vi.fn(body);
    const rej1 = vi.fn(body);
    const res2 = vi.fn(body);
    const rej2 = vi.fn(body);

    axiosObj.interceptors.response.use(res1, rej1);
    axiosObj.interceptors.response.use(res2, rej2);

    try {
      await axiosObj.request(c);
    } catch (err) {
      expect(err).toEqual({ throw: true });
    }
    expect(c.adapter).toBeCalled();
    expect(res1).toBeCalled();
    expect(rej1).not.toBeCalled();
    expect(res2).not.toBeCalled();
    expect(rej2).toBeCalled();
  });

  test('应该支持中间件', async () => {
    const axiosObj = new Axios({
      adapter: mockAdapter(),
    });
    const cb = vi.fn(async (ctx, next) => {
      expect(ctx.res).toBeNull();
      await next();
      expect(ctx.res).toBeTypeOf('object');
    });

    axiosObj.use(cb);

    await axiosObj.get('test');

    expect(cb).toBeCalled();
  });
});
