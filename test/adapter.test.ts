import { describe, test, expect, vi } from 'vitest';
import { createAdapter } from 'src/adapter';
import { noop } from 'scripts/test.utils';

describe('src/adapter.ts', () => {
  test('应该抛出异常', () => {
    expect(() =>
      createAdapter(undefined as any),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: platform 不是一个 object"',
    );
    expect(() => createAdapter({} as any)).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: request 不是一个 function"',
    );
    expect(() =>
      createAdapter({ request: vi.fn() } as any),
    ).toThrowErrorMatchingInlineSnapshot(
      '"[axios-miniprogram]: upload 不是一个 function"',
    );
    expect(() =>
      createAdapter({ request: vi.fn(), upload: vi.fn() } as any),
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
      url: 'test',
      method: 'GET' as const,
      success: noop,
      fail: noop,
    };
    const u = {
      type: 'upload' as const,
      url: 'test',
      method: 'POST' as const,
      data: {},
      success: noop,
      fail: noop,
    };
    const d = {
      type: 'download' as const,
      url: 'test',
      method: 'GET' as const,
      params: { fileName: '', filePath: '' },
      success: noop,
      fail: noop,
    };

    expect(p.request).not.toBeCalled();
    a(r);
    expect(p.request).toBeCalled();

    expect(p.upload).not.toBeCalled();
    a(u);
    expect(p.upload).toBeCalled();

    expect(p.download).not.toBeCalled();
    a(d);
    expect(p.download).toBeCalled();
  });
});
