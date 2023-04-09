import { describe, test, expect, vi } from 'vitest';
import { ignore } from '@/helpers/ignore';
import { mergeConfig } from '@/core/mergeConfig';
import { CancelToken } from '@/core/cancel';

describe('src/core/mergeConfig.ts', () => {
  test('应该支持空参数', () => {
    expect(mergeConfig()).toEqual({});
    expect(mergeConfig({ baseURL: '/api' })).toEqual({ baseURL: '/api' });
  });

  test('应该只取 config2', () => {
    const c1 = {
      url: 'a',
      method: 'get' as const,
      upload: true,
      download: true,
    };
    const c2 = {
      url: 'b',
      method: 'post' as const,
      upload: false,
      download: false,
    };

    expect(mergeConfig(c1, {})).toEqual({});
    expect(mergeConfig({}, c2)).toEqual(c2);
    expect(mergeConfig(c1, c2)).toEqual(c2);

    Object.keys(c2).forEach((_) => {
      const key = _ as keyof typeof c2;
      expect(mergeConfig(ignore(c1, key), c2)).toEqual(c2);
      expect(mergeConfig(c1, ignore(c2, key))).toEqual(ignore(c2, key));
    });
  });

  test('应该深度合并', () => {
    const o1 = {
      v1: 1,
      v2: 1,
      v3: {
        v1: 1,
      },
    };
    const o2 = {
      v2: 2,
      v3: {
        v2: 2,
      },
    };
    const o3 = {
      v1: 1,
      v2: 2,
      v3: {
        v1: 1,
        v2: 2,
      },
    };
    const c1 = {
      headers: {
        common: {
          v1: 1,
        },
        v1: 1,
      },
      params: o1,
      data: o1,
    };
    const c2 = {
      headers: {
        common: {
          v2: 2,
        },
        v2: 2,
      },
      params: o2,
      data: o2,
    };
    const mc = {
      headers: {
        common: {
          v1: 1,
          v2: 2,
        },
        v1: 1,
        v2: 2,
      },
      params: o3,
      data: o3,
    };

    expect(mergeConfig(c1, {})).toEqual(c1);
    expect(mergeConfig({}, c2)).toEqual(c2);
    expect(mergeConfig(c1, c2)).toEqual(mc);

    Object.keys(c2).forEach((_) => {
      const key = _ as keyof typeof c2;
      expect(mergeConfig(ignore(c1, key), c2)).toEqual({
        ...mc,
        [key]: c2[key],
      });
      expect(mergeConfig(c1, ignore(c2, key))).toEqual({
        ...mc,
        [key]: c1[key],
      });
    });
  });

  test('应该优先取 config2', () => {
    const c1 = {
      adapter: vi.fn(),
      baseURL: 'https://c1.com',
      paramsSerializer: vi.fn(),
      transformRequest: vi.fn(),
      transformResponse: vi.fn(),
      errorHandler: vi.fn(),
      cancelToken: CancelToken.source().token,
      dataType: 'json',
      responseType: 'json',
      timeout: 1000,
      validateStatus: vi.fn(),
      onUploadProgress: vi.fn(),
      onDownloadProgress: vi.fn(),
    };
    const c2 = {
      adapter: vi.fn(),
      baseURL: 'https://c2.com',
      paramsSerializer: vi.fn(),
      transformRequest: vi.fn(),
      transformResponse: vi.fn(),
      errorHandler: vi.fn(),
      cancelToken: CancelToken.source().token,
      dataType: 'json',
      responseType: 'json',
      timeout: 1000,
      validateStatus: vi.fn(),
      onUploadProgress: vi.fn(),
      onDownloadProgress: vi.fn(),
    };

    expect(mergeConfig(c1, {})).toEqual(c1);
    expect(mergeConfig({}, c2)).toEqual(c2);
    expect(mergeConfig(c1, c2)).toEqual(c2);

    Object.keys(c2).forEach((_) => {
      const key = _ as keyof typeof c2;
      expect(mergeConfig(ignore(c1, key), c2)).toEqual(c2);
      expect(mergeConfig(c1, ignore(c2, key))).toEqual({
        ...c2,
        [key]: c1[key],
      });
    });
  });

  test('应该支持自定义配置', () => {
    const c1 = {
      custom1: 1,
      custom2: 'c1',
      custom3: vi.fn(),
      custom4: { c1: 1 },
      custom5: ['c1'],
      custom6: new Date(),
      custom7: () => 1,
    };
    const c2 = {
      custom1: 2,
      custom2: 'c2',
      custom3: vi.fn(),
      custom4: { c2: 2 },
      custom5: ['c2'],
      custom6: new Date(),
      custom7: () => 2,
    };

    expect(mergeConfig(c1, {})).toEqual(c1);
    expect(mergeConfig({}, c2)).toEqual(c2);
    expect(mergeConfig(c1, c2)).toEqual(c2);

    Object.keys(c2).forEach((_) => {
      const key = _ as keyof typeof c2;
      expect(mergeConfig(ignore(c1, key), c2)).toEqual(c2);
      expect(mergeConfig(c1, ignore(c2, key))).toEqual({
        ...c2,
        [key]: c1[key],
      });
    });
  });
});
