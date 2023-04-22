import { describe, test, expect } from 'vitest';
import {
  mockAdapter,
  mockAdapterError,
  testEachMethods,
} from 'scripts/test.utils';
import axios from '@/axios';

describe('src/axios.ts', () => {
  const data = { 'src/axios.ts': true };

  test('应该处理成功和失败', () => {
    axios({
      adapter: mockAdapter({
        headers: { type: 'json' },
        data: { v1: 1 },
        before: (config) => {
          expect(config.url).toBe('http://api.com/test/1');
        },
      }),
      baseURL: 'http://api.com',
      url: 'test/:id',
      params: {
        id: 1,
      },
    }).then((res) => {
      expect(res.headers).toEqual({ type: 'json' });
      expect(res.data).toEqual({ v1: 1 });
    });

    axios('test/:id', {
      adapter: mockAdapterError({
        headers: { type: 'json' },
        data: { v1: 1 },
        before: (config) => {
          expect(config.url).toBe('http://api.com/test/1');
        },
      }),
      baseURL: 'http://api.com',
      data: {
        id: 1,
      },
    }).catch((err) => {
      expect(err.response.headers).toEqual({ type: 'json' });
      expect(err.response.data).toEqual({ v1: 1 });
    });
  });

  testEachMethods('应该可以发送 %d 请求', (k) => {
    const c = {
      baseURL: 'http://api.com',
      adapter: mockAdapter({
        before: (config) => {
          expect(config.url).toBe('http://api.com/test');
        },
        data,
      }),
    };

    axios('test', { ...c, method: k }).then((res) => {
      expect(res.data).toEqual(data);
    });
    axios({ ...c, url: 'test', method: k }).then((res) => {
      expect(res.data).toEqual(data);
    });
  });
});
