import { describe, test, expect, vi } from 'vitest';
import { mockAdapter } from 'scripts/test.utils';
import Axios from '@/core/Axios';
import AxiosDomain from '@/core/AxiosDomain';

describe('src/core/Axios.ts', () => {
  const data = {
    result: null,
  };
  const axios = new Axios({
    baseURL: 'http://api.com',
  });

  test('应该继承自 AxiosDomain', () => {
    expect(new Axios() instanceof AxiosDomain).toBeTruthy();
  });

  test('应该有这些静态属性', () => {
    expect(Axios.as).toEqual(['options', 'trace', 'connect']);
    expect(Axios.asp).toEqual(['head', 'get', 'delete']);
    expect(Axios.asd).toEqual(['post', 'put']);
  });

  test('应该有这些实例属性及方法', () => {
    const c = {
      baseURL: 'http://api.com',
    };

    expect(axios.defaults).toEqual(c);
    expect(axios.interceptors).toBeTypeOf('object');
    expect(axios.request).toBeTypeOf('function');
    expect(axios.getUri).toBeTypeOf('function');
    expect(axios.fork).toBeTypeOf('function');

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

  test('添加多个请求拦截器时应该按添加顺序从后往前依次执行', () => {
    const axios = new Axios();

    const cb1 = vi.fn((v) => {
      expect(v.data.index).toBe(2);
      v.data.index = 3;
      return v;
    });
    const cb2 = vi.fn((v) => {
      expect(v.data.index).toBe(1);
      v.data.index = 2;
      return v;
    });
    const cb3 = vi.fn((v) => {
      expect(v.data.index).toBe(0);
      v.data.index = 1;
      return v;
    });

    axios.interceptors.request.use(cb1);
    axios.interceptors.request.use(cb2);
    axios.interceptors.request.use(cb3);

    axios.request('/test', {
      adapter: (config) => {
        expect(config.data!.index).toBe(3);
      },
      data: {
        index: 0,
      },
    });
  });

  test('请求拦截器应该支持抛出异常', async () => {
    const axios = new Axios();
    const c = { adapter: vi.fn(), url: 'test' };
    const body = (v: any) => {
      throw { ...v, throw: true };
    };
    const res1 = vi.fn(body);
    const rej1 = vi.fn(body);
    const res2 = vi.fn(body);
    const rej2 = vi.fn(body);

    axios.interceptors.request.use(res1, rej1);
    axios.interceptors.request.use(res2, rej2);

    try {
      await axios.request(c);
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

  test('添加多个响应拦截器时应该按添加顺序从前往后依次执行', async () => {
    const axios = new Axios();

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

    axios.interceptors.response.use(cb1);
    axios.interceptors.response.use(cb2);
    axios.interceptors.response.use(cb3);

    const response = await axios.request<{ index: 0 }>('/test', {
      adapter: mockAdapter({ data: { index: 0 } }),
    });

    expect(response.data.index).toBe(3);
  });

  test('响应拦截器应该支持抛出异常', async () => {
    const axios = new Axios();
    const c = { adapter: vi.fn(mockAdapter()), url: 'test' };
    const body = () => {
      throw { throw: true };
    };
    const res1 = vi.fn(body);
    const rej1 = vi.fn(body);
    const res2 = vi.fn(body);
    const rej2 = vi.fn(body);

    axios.interceptors.response.use(res1, rej1);
    axios.interceptors.response.use(res2, rej2);

    try {
      await axios.request(c);
    } catch (err) {
      expect(err).toEqual({ throw: true });
    }
    expect(c.adapter).toBeCalled();
    expect(res1).toBeCalled();
    expect(rej1).not.toBeCalled();
    expect(res2).not.toBeCalled();
    expect(rej2).toBeCalled();
  });

  test('应该可以获取 URI', () => {
    expect(axios.getUri({ url: 'test' })).toBe('test');
    expect(axios.getUri({ url: 'test', params: { id: 1 } })).toBe('test?id=1');
    expect(axios.getUri({ url: 'test', paramsSerializer: () => 'id=1' })).toBe(
      'test?id=1',
    );
  });

  test('应该可以派生领域', () => {
    const a1 = axios.fork({ baseURL: 'test' });
    const a2 = new Axios().fork({ baseURL: 'test' });

    expect(a1.defaults.baseURL).toBe('http://api.com/test');
    expect(a1 instanceof AxiosDomain).toBeTruthy();
    expect(a2.defaults.baseURL).toBe('/test');
  });

  test('基于当前实例派生的领域应该可以复用当前实例上的中间件', async () => {
    const axios = new Axios();
    const req = vi.fn((v) => v);
    const res = vi.fn((v) => v);

    axios.interceptors.request.use(req);
    axios.interceptors.response.use(res);

    const a = axios.fork({ baseURL: 'test' });
    await a.request('test', { adapter: mockAdapter() });

    expect(req).toBeCalled();
    expect(res).toBeCalled();
  });
});
