import { describe, test, expect, vi } from 'vitest';
import {
  mockAdapter,
  mockAdapterError,
  mockAdapterFail,
} from 'scripts/test.utils';
import { request } from '@/core/request';
import axios from '@/axios';
import Axios from '@/core/Axios';

describe('src/core/request.ts', () => {
  test('应该正确的响应请求', async () => {
    const s = request({
      adapter: mockAdapter(),
      url: '/test',
      method: 'get',
    });
    const e = request({
      adapter: mockAdapterError(),
      url: '/test',
      method: 'get',
      validateStatus: () => false,
    });
    const f = request({
      adapter: mockAdapterFail(),
      url: '/test',
      method: 'get',
    });

    await expect(s).resolves.toMatchInlineSnapshot(`
      {
        "config": {
          "adapter": [Function],
          "method": "get",
          "url": "/test",
        },
        "data": {
          "result": null,
        },
        "headers": {},
        "request": {
          "abort": [Function],
        },
        "status": 200,
        "statusText": "OK",
      }
    `);

    await expect(e).rejects.toMatchInlineSnapshot(
      '[Error: validate status fail]',
    );
    await expect(e.catch((e) => Object.assign({}, e))).resolves
      .toMatchInlineSnapshot(`
      {
        "config": {
          "adapter": [Function],
          "method": "get",
          "url": "/test",
          "validateStatus": [Function],
        },
        "request": {
          "abort": [Function],
        },
        "response": {
          "config": {
            "adapter": [Function],
            "method": "get",
            "url": "/test",
            "validateStatus": [Function],
          },
          "data": {
            "result": null,
          },
          "headers": {},
          "request": {
            "abort": [Function],
          },
          "status": 500,
          "statusText": "ERROR",
        },
      }
    `);

    await expect(f).rejects.toMatchInlineSnapshot('[Error: request fail]');
    await expect(f.catch((e) => Object.assign({}, e))).resolves
      .toMatchInlineSnapshot(`
      {
        "config": {
          "adapter": [Function],
          "method": "get",
          "url": "/test",
        },
        "request": {
          "abort": [Function],
        },
        "response": {
          "config": {
            "adapter": [Function],
            "method": "get",
            "url": "/test",
          },
          "data": {
            "result": null,
          },
          "headers": {},
          "isFail": true,
          "request": {
            "abort": [Function],
          },
          "status": 400,
          "statusText": "FAIL",
        },
      }
    `);
  });

  test('应该支持请求发送前取消请求', async () => {
    const cb = vi.fn();
    const task = {
      abort: vi.fn(),
    };
    const { cancel, token } = axios.CancelToken.source();

    cancel();

    await request({
      adapter: () => task,
      url: '/test',
      method: 'get' as const,
      cancelToken: token,
    }).catch(cb);

    expect(task.abort).toBeCalled();
    expect(cb).toBeCalled();
  });

  test('应该支持请求发送后取消请求', async () => {
    const cb = vi.fn();
    const task = {
      abort: vi.fn(),
    };
    const { cancel, token } = axios.CancelToken.source();

    const p = request({
      adapter: () => task,
      url: '/test',
      method: 'get' as const,
      cancelToken: token,
    }).catch(cb);

    cancel();
    await p;

    expect(task.abort).toBeCalled();
    expect(cb).toBeCalled();
  });

  test('应该发送不同类型的请求', () => {
    request({
      adapter: ({ type }) => {
        expect(type).toBe('upload');
      },
      url: 'test',
      method: 'post',
      upload: true,
    });

    request({
      adapter: ({ type }) => {
        expect(type).toBe('download');
      },
      url: 'test',
      method: 'get',
      download: true,
    });

    [...Axios.as, ...Axios.asp, ...Axios.asd].forEach((a) => {
      request({
        adapter: ({ type }) => {
          expect(type).toBe('request');
        },
        url: 'test',
        method: a,
      });
    });
  });
});
