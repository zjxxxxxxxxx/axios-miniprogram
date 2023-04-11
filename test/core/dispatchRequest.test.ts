import { describe, test, expect, vi } from 'vitest';
import {
  asyncNext,
  mockAdapter,
  mockAdapterError,
  mockAdapterFail,
} from 'scripts/test.utils';
import { dispatchRequest } from '@/core/dispatchRequest';
import axios from '@/axios';
import _defaults from '@/defaults';

describe('src/core/dispatchRequest.ts', () => {
  const defaults = {
    ..._defaults,
    adapter: mockAdapter(),
    baseURL: 'http://api.com',
    method: 'get' as const,
    headers: {},
  };

  test('应该抛出异常', () => {
    expect(() => dispatchRequest({})).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: adapter 不是一个 function"',
    );
    expect(() =>
      dispatchRequest({ adapter: mockAdapter() }),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: url 不是一个 string"',
    );
    expect(() =>
      dispatchRequest({ adapter: mockAdapter(), url: '/' }),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: method 不是一个 string"',
    );
    expect(() =>
      dispatchRequest({ adapter: mockAdapter(), url: '/', method: 'get' }),
    ).not.toThrowError();
  });

  test('坏的适配器应该抛出异常', () => {
    expect(
      dispatchRequest({
        adapter: () => {
          throw 'bad adapter';
        },
        url: '/',
        method: 'get',
      }).catch((e) => ({ ...e })),
    ).resolves.toMatchInlineSnapshot(`
      {
        "config": {
          "adapter": [Function],
          "data": undefined,
          "headers": undefined,
          "method": "get",
          "url": "",
        },
        "request": undefined,
        "response": {
          "config": {
            "adapter": [Function],
            "data": undefined,
            "headers": undefined,
            "method": "get",
            "url": "",
          },
          "data": undefined,
          "headers": {},
          "isFail": true,
          "request": undefined,
          "status": 400,
          "statusText": "Bad Adapter",
        },
      }
    `);
  });

  test('应该支持转换 URL', () => {
    const c1 = {
      ...defaults,
      url: 'test',
    };
    const c2 = {
      ...defaults,
      url: 'test/:id',
      params: {
        id: 1,
      },
    };
    const c3 = {
      ...defaults,
      url: 'test/:id',
      data: {
        id: 1,
      },
    };

    dispatchRequest(c1);
    dispatchRequest(c2);
    dispatchRequest(c3);

    expect(c1.url).toBe('http://api.com/test');
    expect(c2.url).toBe('http://api.com/test/1?id=1');
    expect(c3.url).toBe('http://api.com/test/1');
  });

  test('应该支持拉平请求头', () => {
    const c = {
      ...defaults,
      url: 'test',
      headers: {
        common: {
          h1: 1,
        },
        get: {
          h2: 2,
        },
        h3: 3,
      },
    };

    dispatchRequest(c);

    expect(c.headers).toEqual({
      h1: 1,
      h2: 2,
      h3: 3,
    });
  });

  test('应该支持转换请求数据', () => {
    const c = {
      ...defaults,
      url: 'test',
      data: {},
      transformRequest: () => ({ id: 1 }),
    };

    dispatchRequest(c);

    expect(c.data).toEqual({ id: 1 });
  });

  test('应该支持转换响应数据', async () => {
    const c = {
      ...defaults,
      url: 'test',
      transformResponse: () => ({ result: 1 }),
    };

    const r = await dispatchRequest(c);

    expect(r.data).toEqual({ result: 1 });
  });

  test('应该支持自定义异常处理器', async () => {
    const e1 = vi.fn();
    const e2 = vi.fn();
    const c1 = {
      ...defaults,
      adapter: mockAdapterError(),
      url: 'test',
      errorHandler: async (err: unknown) => {
        e1(err);
      },
    };
    const c2 = {
      ...defaults,
      adapter: mockAdapterFail(),
      url: 'test',
      errorHandler: async (err: unknown) => {
        e2(err);
      },
    };

    try {
      await dispatchRequest(c1);
    } catch (err) {
      expect(e1).toBeCalled();
      expect(e1.mock.calls[0][0]).toBe(err);
      expect(axios.isAxiosError(err)).toBeTruthy();
    }

    try {
      await dispatchRequest(c2);
    } catch (err) {
      expect(e2).toBeCalled();
      expect(e2.mock.calls[0][0]).toBe(err);
      expect(axios.isAxiosError(err)).toBeTruthy();
    }
  });

  test('应该支持异步的自定义异常处理器', async () => {
    const e1 = vi.fn();
    const e2 = vi.fn();
    const c1 = {
      ...defaults,
      adapter: mockAdapterError(),
      url: 'test',
      errorHandler: e1,
    };
    const c2 = {
      ...defaults,
      adapter: mockAdapterFail(),
      url: 'test',
      errorHandler: e2,
    };

    try {
      await dispatchRequest(c1);
    } catch (err) {
      expect(e1).toBeCalled();
      expect(e1.mock.calls[0][0]).toBe(err);
      expect(axios.isAxiosError(err)).toBeTruthy();
    }

    try {
      await dispatchRequest(c2);
    } catch (err) {
      expect(e2).toBeCalled();
      expect(e2.mock.calls[0][0]).toBe(err);
      expect(axios.isAxiosError(err)).toBeTruthy();
    }
  });

  test('请求发送前取消请求应该抛出异常', async () => {
    const cb = vi.fn();
    const { cancel, token } = axios.CancelToken.source();
    const c = {
      ...defaults,
      url: 'test',
      cancelToken: token,
    };

    cancel();

    try {
      dispatchRequest(c);
    } catch (err) {
      cb(err);
    }

    expect(cb).toBeCalled();
    expect(axios.isCancel(cb.mock.calls[0][0])).toBeTruthy();
  });

  test('请求发送后取消请求应该抛出异常', async () => {
    const cb = vi.fn();
    const { cancel, token } = axios.CancelToken.source();
    const c = {
      ...defaults,
      url: 'test',
      cancelToken: token,
    };

    const p = dispatchRequest(c).catch(cb);

    await asyncNext();
    expect(cb).not.toBeCalled();

    cancel();
    await p;

    expect(cb).toBeCalled();
    expect(axios.isCancel(cb.mock.calls[0][0])).toBeTruthy();
  });
});
