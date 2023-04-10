import { describe, test, expect, vi } from 'vitest';
import { noop } from 'scripts/test.utils';
import { AxiosPlatform, createAdapter } from '@/adapter';

describe('src/adapter.ts', () => {
  test('应该抛出异常', () => {
    expect(() =>
      createAdapter(undefined as unknown as AxiosPlatform),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: platform 不是一个 object"',
    );
    expect(() =>
      createAdapter({} as unknown as AxiosPlatform),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: request 不是一个 function"',
    );
    expect(() =>
      createAdapter({ request: vi.fn() } as unknown as AxiosPlatform),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: upload 不是一个 function"',
    );
    expect(() =>
      createAdapter({
        request: vi.fn(),
        upload: vi.fn(),
      } as unknown as AxiosPlatform),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: download 不是一个 function"',
    );
  });

  test('应该可以成功执行对应的平台函数', () => {
    const p = {
      request: vi.fn(),
      upload: vi.fn(),
      download: vi.fn(),
    };
    const a = createAdapter(p);
    const r = {
      type: 'request' as const,
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
      url: 'test',
      method: 'GET' as const,
      success: noop,
      fail: noop,
    };
    const u = {
      type: 'upload' as const,
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
      url: 'test',
      method: 'POST' as const,
      data: {
        name: 'file',
        filePath: '/path/file',
        user: 'test',
        id: 1,
      },
      success: noop,
      fail: noop,
    };
    const d = {
      type: 'download' as const,
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
      url: 'test',
      method: 'GET' as const,
      params: {
        filePath: '/path/file',
      },
      success: noop,
      fail: noop,
    };

    expect(p.request).not.toBeCalled();
    a(r);
    expect(p.request.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "fail": [Function],
        "header": {
          "Accept": "application/json, text/plain, */*",
        },
        "headers": {
          "Accept": "application/json, text/plain, */*",
        },
        "method": "GET",
        "success": [Function],
        "type": "request",
        "url": "test",
      }
    `);

    expect(p.upload).not.toBeCalled();
    a(u);
    expect(p.upload.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "data": {
          "filePath": "/path/file",
          "id": 1,
          "name": "file",
          "user": "test",
        },
        "fail": [Function],
        "fileName": "file",
        "filePath": "/path/file",
        "fileType": undefined,
        "formData": {
          "id": 1,
          "user": "test",
        },
        "header": {
          "Accept": "application/json, text/plain, */*",
        },
        "headers": {
          "Accept": "application/json, text/plain, */*",
        },
        "method": "POST",
        "name": "file",
        "success": [Function],
        "type": "upload",
        "url": "test",
      }
    `);

    expect(p.download).not.toBeCalled();
    a(d);
    expect(p.download.mock.calls[0][0]).toMatchInlineSnapshot(`
      {
        "fail": [Function],
        "filePath": "/path/file",
        "header": {
          "Accept": "application/json, text/plain, */*",
        },
        "headers": {
          "Accept": "application/json, text/plain, */*",
        },
        "method": "GET",
        "params": {
          "filePath": "/path/file",
        },
        "success": [Function],
        "type": "download",
        "url": "test",
      }
    `);
  });

  test('应该支持转换下载数据', () => {
    const p1 = {
      request: vi.fn(),
      upload: vi.fn(),
      download: vi.fn((config) => {
        config.success({
          filePath: config.filePath,
          tempFilePath: '/path/temp/file',
        });
      }),
    };
    const p2 = {
      request: vi.fn(),
      upload: vi.fn(),
      download: vi.fn((config) => {
        config.success({
          filePath: config.filePath,
          apFilePath: '/path/temp/file',
        });
      }),
    };

    createAdapter(p1)({
      type: 'download' as const,
      url: 'test',
      method: 'GET' as const,
      params: { filePath: '/test/file' },
      success: (response: any) => {
        expect(response.data).toMatchInlineSnapshot(`
          {
            "filePath": "/test/file",
            "tempFilePath": "/path/temp/file",
          }
        `);
      },
      fail: noop,
    });

    createAdapter(p2)({
      type: 'download' as const,
      url: 'test',
      method: 'GET' as const,
      params: { filePath: '/test/file' },
      success: (response: any) => {
        expect(response.data).toMatchInlineSnapshot(`
          {
            "filePath": "/test/file",
            "tempFilePath": "/path/temp/file",
          }
        `);
      },
      fail: noop,
    });
  });
});
