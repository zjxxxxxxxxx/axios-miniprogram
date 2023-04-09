import { describe, test, expect } from 'vitest';
import {
  mockAdapter,
  mockAdapterError,
  mockAdapterFail,
} from 'scripts/test.utils';
import { request } from '@/core/request';

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
        "data": {},
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
          "data": {},
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
          "data": {},
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
});
