import { describe, test, expect, vi } from 'vitest';
import { noop } from 'scripts/test.utils';
import { AxiosAdapterPlatform, createAdapter } from '@/adpater/createAdapter';

describe('src/adapter/createAdapter.ts', () => {
  test('应该抛出异常', () => {
    expect(() =>
      createAdapter(undefined as unknown as AxiosAdapterPlatform),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: platform 不是一个 object"',
    );
    expect(() =>
      createAdapter({} as unknown as AxiosAdapterPlatform),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: request 不是一个 function"',
    );
    expect(() =>
      createAdapter({ request: vi.fn() } as unknown as AxiosAdapterPlatform),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: upload 不是一个 function"',
    );
    expect(() =>
      createAdapter({
        request: vi.fn(),
        upload: vi.fn(),
      } as unknown as AxiosAdapterPlatform),
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
        fileType: 'image',
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
    const rOpts = p.request.mock.calls[0][0];
    expect(rOpts).toMatchInlineSnapshot(`
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
    expect(rOpts.header).toEqual(r.headers);

    expect(p.download).not.toBeCalled();
    a(d);
    const dOpts = p.download.mock.calls[0][0];
    expect(dOpts).toMatchInlineSnapshot(`
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
        "success": [Function],
        "type": "download",
        "url": "test",
      }
    `);
    expect(dOpts.header).toEqual(d.headers);
    expect(dOpts.filePath).toEqual(d.params.filePath);

    expect(p.upload).not.toBeCalled();
    a(u);
    const uOpts = p.upload.mock.calls[0][0];
    expect(uOpts).toMatchInlineSnapshot(`
      {
        "fail": [Function],
        "fileName": "file",
        "filePath": "/path/file",
        "fileType": "image",
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
    expect(uOpts.header).toEqual(u.headers);
    expect(uOpts.name).toEqual(u.data.name);
    expect(uOpts.fileName).toEqual(u.data.name);
    expect(uOpts.filePath).toEqual(u.data.filePath);
    expect(uOpts.fileType).toEqual(u.data.fileType);
    expect(uOpts.formData).toEqual({
      id: u.data.id,
      user: u.data.user,
    });
  });

  test('应该支持转换下载数据', () => {
    const p1 = {
      request: vi.fn(),
      upload: vi.fn(),
      download: vi.fn((config) => {
        config.success({
          tempFilePath: '/path/temp/file',
        });
      }),
    };
    const p2 = {
      ...p1,
      download: vi.fn((config) => {
        config.success({
          apFilePath: '/path/temp/file',
        });
      }),
    };
    const p3 = {
      ...p1,
      download: vi.fn((config) => {
        config.success({
          filePath: config.filePath,
          tempFilePath: '/path/temp/file',
        });
      }),
    };
    const p4 = {
      ...p1,
      download: vi.fn((config) => {
        config.success({
          filePath: config.filePath,
          apFilePath: '/path/temp/file',
        });
      }),
    };
    const c1 = {
      type: 'download' as const,
      url: 'test',
      method: 'GET' as const,
      success: (response: any) => {
        expect(response.data).toMatchInlineSnapshot(`
          {
            "filePath": undefined,
            "fileSize": undefined,
            "tempFilePath": "/path/temp/file",
          }
        `);
      },
      fail: noop,
    };
    const c2 = {
      ...c1,
      success: (response: any) => {
        expect(response.data).toMatchInlineSnapshot(`
          {
            "filePath": undefined,
            "fileSize": undefined,
            "tempFilePath": "/path/temp/file",
          }
        `);
      },
    };
    const c3 = {
      ...c1,
      params: {
        filePath: '/user/path',
      },
      success: (response: any) => {
        expect(response.data).toMatchInlineSnapshot(`
          {
            "filePath": "/user/path",
            "fileSize": undefined,
            "tempFilePath": "/path/temp/file",
          }
        `);
      },
    };
    const c4 = {
      ...c1,
      params: {
        filePath: '/user/path',
      },
      success: (response: any) => {
        expect(response.data).toMatchInlineSnapshot(`
          {
            "filePath": "/user/path",
            "fileSize": undefined,
            "tempFilePath": "/path/temp/file",
          }
        `);
      },
    };

    createAdapter(p1)(c1);
    createAdapter(p2)(c2);
    createAdapter(p3)(c3);
    createAdapter(p4)(c4);
  });

  test('应该支持转换失败的请求', () => {
    const p1 = {
      request: vi.fn(({ fail }) => fail({})),
      upload: vi.fn(),
      download: vi.fn(),
    };
    const p2 = {
      ...p1,
      request: vi.fn(({ fail }) =>
        fail({ status: 500, data: { result: null } }),
      ),
    };
    const p3 = {
      ...p1,
      request: vi.fn(({ fail }) =>
        fail({ errMsg: 'request:fail', errno: 1000 }),
      ),
    };
    const c1 = {
      type: 'request' as const,
      url: 'test',
      method: 'GET' as const,
      success: noop,
      fail: (response: any) => {
        expect(response).toMatchInlineSnapshot(`
          {
            "data": {
              "errMsg": undefined,
              "errno": undefined,
            },
            "headers": undefined,
            "status": undefined,
          }
        `);
      },
    };
    const c2 = {
      ...c1,
      fail: (response: any) => {
        expect(response).toMatchInlineSnapshot(`
          {
            "data": {
              "errMsg": undefined,
              "errno": undefined,
            },
            "headers": undefined,
            "status": 500,
          }
        `);
      },
    };
    const c3 = {
      ...c1,
      fail: (response: any) => {
        expect(response).toMatchInlineSnapshot(`
          {
            "data": {
              "errMsg": "request:fail",
              "errno": 1000,
            },
            "headers": undefined,
            "status": undefined,
          }
        `);
      },
    };

    createAdapter(p1)(c1);
    createAdapter(p2)(c2);
    createAdapter(p3)(c3);
  });
});
