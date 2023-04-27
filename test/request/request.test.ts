import { describe, test, expect, vi } from 'vitest';
import {
  asyncTimeout,
  eachMethods,
  mockAdapter,
  mockAdapterError,
  mockAdapterFail,
  testEachMethods,
} from 'scripts/test.utils';
import { request } from '@/request/request';
import axios from '@/axios';

describe('src/request/request.ts', () => {
  test('应该支持转换 URL', () => {
    const c1 = {
      adapter(config: AnyObject) {
        expect(config.url).toBe('http://api.com/test');
      },
      baseURL: 'http://api.com',
      url: 'test',
    };
    const c2 = {
      adapter(config: AnyObject) {
        expect(config.url).toBe('http://api.com/test/1');
      },
      baseURL: 'http://api.com',
      url: 'test/:id',
      params: {
        id: 1,
      },
    };
    const c3 = {
      adapter(config: AnyObject) {
        expect(config.url).toBe('http://api.com/test/1');
      },
      baseURL: 'http://api.com',
      url: 'test/:id',
      method: 'post' as const,
      data: {
        id: 1,
      },
    };

    request(c1);
    request(c2);
    request(c3);
  });

  testEachMethods('%s 方法应该返回正确的响应体结构', (k) => {
    const c = {
      adapter: mockAdapter(),
      url: '/test',
      method: k,
    };

    request(c).then((response) => {
      expect(response.status).toBeTypeOf('number');
      expect(response.statusText).toBeTypeOf('string');
      expect(response.headers).toBeTypeOf('object');
      expect(response.data).toBeTypeOf('object');
      expect(response.config).toBeTypeOf('object');
      expect(response.request).toBeTypeOf('object');
    });
  });

  testEachMethods('%s 方法应该支持补全响应体结构', (k) => {
    const c = {
      // @ts-ignore
      adapter: ({ success }) => {
        success({
          data: {},
        });
      },
      url: '/test',
      method: k,
    };

    request(c).then((response) => {
      expect(response.status).toBeTypeOf('number');
      expect(response.statusText).toBeTypeOf('string');
      expect(response.headers).toBeTypeOf('object');
      expect(response.data).toBeTypeOf('object');
      expect(response.isFail).toBeTypeOf('undefined');
      expect(response.config).toBeTypeOf('object');
      expect(response.request).toBeTypeOf('undefined');
    });
  });

  testEachMethods('%s 方法应该返回正确的响应错误结构', (k) => {
    const c = {
      adapter: mockAdapterError(),
      validateStatus: () => false,
      url: '/test',
      method: k,
    };

    request(c).catch((error) => {
      expect(error.message).toBeTypeOf('string');
      expect(error.config).toBeTypeOf('object');
      expect(error.request).toBeTypeOf('object');
      expect(error.response.status).toBeTypeOf('number');
      expect(error.response.statusText).toBeTypeOf('string');
      expect(error.response.headers).toBeTypeOf('object');
      expect(error.response.data).toBeTypeOf('object');
      expect(error.response.isFail).toBeTypeOf('undefined');
      expect(error.response.config).toBeTypeOf('object');
      expect(error.response.request).toBeTypeOf('object');
    });
  });

  testEachMethods('%s 方法应该返回正确的平台错误结构', (k) => {
    const c = {
      adapter: mockAdapterFail(),
      validateStatus: () => false,
      url: '/test',
      method: k,
    };

    request(c).catch((error) => {
      expect(error.message).toBeTypeOf('string');
      expect(error.config).toBeTypeOf('object');
      expect(error.request).toBeTypeOf('object');
      expect(error.response.status).toBeTypeOf('number');
      expect(error.response.statusText).toBeTypeOf('string');
      expect(error.response.headers).toBeTypeOf('object');
      expect(error.response.data).toBeTypeOf('object');
      expect(error.response.isFail).toBeTruthy();
      expect(error.response.config).toBeTypeOf('object');
      expect(error.response.request).toBeTypeOf('object');
    });
  });

  testEachMethods('%s 方法应该支持补全错误体结构', (k) => {
    const c = {
      // @ts-ignore
      adapter: ({ fail }) => {
        fail({
          data: {},
        });
      },
      url: '/test',
      method: k,
    };

    request(c).catch((error) => {
      expect(error.response.status).toBeTypeOf('number');
      expect(error.response.statusText).toBeTypeOf('string');
      expect(error.response.headers).toBeTypeOf('object');
      expect(error.response.data).toBeTypeOf('object');
      expect(error.response.isFail).toBeTruthy();
      expect(error.response.config).toBeTypeOf('object');
      expect(error.response.request).toBeTypeOf('undefined');
    });
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

    eachMethods((a) => {
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
