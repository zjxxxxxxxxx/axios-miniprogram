import { describe, test, expect, vi } from 'vitest';
import {
  asyncTimeout,
  mockAdapter,
  mockAdapterError,
  mockAdapterFail,
} from 'scripts/test.utils';
import { request } from '@/core/request';
import Axios from '@/core/Axios';
import axios from '@/axios';

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

  test('无 task 也应该可以取消请求', async () => {
    const cb = vi.fn();

    const { cancel, token } = axios.CancelToken.source();

    cancel();

    await request({
      adapter: () => undefined,
      url: '/test',
      method: 'get' as const,
      cancelToken: token,
    }).catch(cb);

    expect(cb).toBeCalled();
    expect(axios.isCancel(cb.mock.calls[0][0])).toBeTruthy();
  });

  test('应该删除请求数据', () => {
    const c = {
      adapter: mockAdapter(),
      url: 'test',
      data: {},
    };

    [...Axios.as, ...Axios.asp].forEach((k) => {
      const s = { ...c, method: k };
      request(s);
      expect(s.data).toBeUndefined();
    });
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

  test('应该可以监听上传进度', () => {
    const on = vi.fn();
    const cb = vi.fn();

    request({
      adapter: () => ({
        onProgressUpdate: on,
      }),
      url: 'test',
      method: 'post',
      upload: true,
      onUploadProgress: cb,
    });

    expect(on).toBeCalled();
    expect(on.mock.calls[0][0]).toBe(cb);
  });

  test('取消请求时应该可以取消监听上传进度', async () => {
    const on = vi.fn();
    const cb = vi.fn();
    const { cancel, token } = axios.CancelToken.source();

    cancel();

    await request({
      adapter: () => ({
        offProgressUpdate: on,
      }),
      url: 'test',
      method: 'post',
      upload: true,
      onUploadProgress: cb,
      cancelToken: token,
    }).catch((err) => {
      expect(axios.isCancel(err)).toBeTruthy();
    });

    await asyncTimeout();

    expect(on).toBeCalled();
    expect(on.mock.calls[0][0]).toBe(cb);
  });

  test('应该可以监听下载进度', async () => {
    const on = vi.fn();
    const cb = vi.fn();

    request({
      adapter: () => ({
        onProgressUpdate: on,
      }),
      url: 'test',
      method: 'get',
      download: true,
      onDownloadProgress: cb,
    });

    await asyncTimeout();

    expect(on).toBeCalled();
    expect(on.mock.calls[0][0]).toBe(cb);
  });

  test('取消请求时应该可以取消监听下载进度', async () => {
    const on = vi.fn();
    const cb = vi.fn();
    const { cancel, token } = axios.CancelToken.source();

    cancel();

    await request({
      adapter: () => ({
        offProgressUpdate: on,
      }),
      url: 'test',
      method: 'get',
      download: true,
      onDownloadProgress: cb,
      cancelToken: token,
    }).catch((err) => {
      expect(axios.isCancel(err)).toBeTruthy();
    });

    expect(on).toBeCalled();
    expect(on.mock.calls[0][0]).toBe(cb);
  });

  test('上传不应该监听下载进度/下载不应该监听上传进度', async () => {
    const on = vi.fn();
    const cb = vi.fn();

    request({
      adapter: () => ({
        onProgressUpdate: on,
      }),
      url: 'test',
      method: 'post',
      upload: true,
      onDownloadProgress: cb,
    });

    request({
      adapter: () => ({
        onProgressUpdate: on,
      }),
      url: 'test',
      method: 'get',
      download: true,
      onUploadProgress: cb,
    });

    await asyncTimeout();

    expect(on).not.toBeCalled();
    expect(cb).not.toBeCalled();
  });
});
