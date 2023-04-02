import { describe, test, expect } from 'vitest';
import axios from 'src/axios';
import { mockAdapterFail, mockAdapterSuccess } from 'scripts/test.utils';

describe('src/axios.ts', () => {
  test('应该处理成功和失败', () => {
    axios({
      adapter: mockAdapterSuccess({
        headers: { type: 'json' },
        data: { v1: 1 },
        before: (config) => {
          expect(config.url).toBe('http://api.com/user/1?id=1');
        },
      }),
      baseURL: 'http://api.com',
      url: 'user/:id',
      params: {
        id: 1,
      },
    }).then((response) => {
      expect(response.headers).toEqual({ type: 'json' });
      expect(response.data).toEqual({ v1: 1 });
    });

    axios('user/:id', {
      adapter: mockAdapterFail({
        headers: { type: 'json' },
        data: { v1: 1 },
        before: (config) => {
          expect(config.url).toBe('http://api.com/user/1');
        },
      }),
      baseURL: 'http://api.com',
      data: {
        id: 1,
      },
    }).catch((error) => {
      expect(error.response.headers).toEqual({ type: 'json' });
      expect(error.response.data).toEqual({ v1: 1 });
    });
  });
});
