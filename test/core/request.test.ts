import { describe, test, expect } from 'vitest';
import { request } from 'src/core/request';
import {
  mockAdapter,
  mockAdapterError,
  mockAdapterFail,
} from 'scripts/test.utils';

describe('src/core/request.ts', () => {
  test('应该抛出异常', () => {
    expect(request({})).rejects.toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: adapter 不是一个 function"',
    );
    expect(
      request({ adapter: mockAdapter() }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: url 不是一个 string"',
    );
  });

  test('应该能够取到数据', async () => {
    await expect(
      request({
        adapter: mockAdapter(),
        url: '/test',
        method: 'get',
      }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "config": {
          "adapter": [Function],
          "method": "get",
          "url": "/test",
        },
        "data": {},
        "headers": {},
        "request": undefined,
        "status": 200,
        "statusText": "OK",
      }
    `);
    await expect(
      request({
        adapter: mockAdapterError(),
        url: '/test',
        method: 'get',
      }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "config": {
          "adapter": [Function],
          "method": "get",
          "url": "/test",
        },
        "data": {},
        "headers": {},
        "request": undefined,
        "status": 400,
        "statusText": "FAIL",
      }
    `);
    await expect(
      request({
        adapter: mockAdapterFail(),
        url: '/test',
        method: 'get',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot('"网络错误"');
  });
});
