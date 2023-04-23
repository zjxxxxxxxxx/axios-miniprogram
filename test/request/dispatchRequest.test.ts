import { describe, test, expect, vi } from 'vitest';
import { asyncNext, mockAdapter, testEachMethods } from 'scripts/test.utils';
import {
  PLAIN_METHODS,
  WITH_DATA_METHODS,
  WITH_PARAMS_METHODS,
} from '@/constants/methods';
import { dispatchRequest } from '@/request/dispatchRequest';

import axios from '@/axios';
import _defaults from '@/defaults';

describe('src/request/dispatchRequest.ts', () => {
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

  testEachMethods('应该支持 %s 转全大写', (k) => {
    const c = {
      adapter: mockAdapter(),
      url: '/',
      method: k,
    };

    dispatchRequest(c);

    expect(c.method).toBe(k.toUpperCase());
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
          "headers": {},
          "method": "GET",
          "url": "",
        },
        "request": undefined,
        "response": {
          "config": {
            "adapter": [Function],
            "headers": {},
            "method": "GET",
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
      method: 'post' as const,
      url: 'test/:id',
      data: {
        id: 1,
      },
    };

    dispatchRequest(c1);
    dispatchRequest(c2);
    dispatchRequest(c3);

    expect(c1.url).toBe('http://api.com/test');
    expect(c2.url).toBe('http://api.com/test/1');
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

  test.each(WITH_DATA_METHODS)('%s 方法应该支持转换请求数据', (k) => {
    const c = {
      ...defaults,
      url: 'test',
      method: k,
      data: {},
      transformRequest: () => ({ id: 1 }),
    };

    dispatchRequest(c);

    expect(c.data).toEqual({ id: 1 });
  });

  test('不能带数据的请求方法应该删除数据', () => {
    const c = {
      ...defaults,
      url: 'test',
      data: {},
      transformRequest: () => ({ id: 1 }),
    };

    [...PLAIN_METHODS, ...WITH_PARAMS_METHODS].forEach((k) => {
      const s = { ...c, method: k };
      dispatchRequest(s);
      expect(s.data).toBeUndefined();
    });
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
