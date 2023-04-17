import { describe, test, expect } from 'vitest';
import { mockAdapter, mockAdapterError } from 'scripts/test.utils';
import axios from '@/axios';

describe('src/axios.ts', () => {
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
});
