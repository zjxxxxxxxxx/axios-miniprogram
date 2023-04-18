import { describe, test, expect } from 'vitest';
import { flattenHeaders } from '@/core/flattenHeaders';
import {
  requestMethodNames,
  requestMethodWithDataNames,
  requestMethodWithParamsNames,
} from '@/core/AxiosDomain';

describe('src/core/flattenHeaders.ts', () => {
  const keys = [
    ...requestMethodNames,
    ...requestMethodWithParamsNames,
    ...requestMethodWithDataNames,
  ];
  const baseHeaders = Object.fromEntries(
    keys.map((k) => [k, { v1: `${k}1`, v2: `${k}2` }]),
  ) as unknown as Record<(typeof keys)[number], AnyObject>;

  test('应该支持空配置', () => {
    expect(flattenHeaders({})).toEqual({});
  });

  test('应该支持自定义 headers', () => {
    const h = {
      v1: '1',
      v2: '2',
    };
    expect(flattenHeaders({ headers: h, method: 'get' })).toEqual(h);
  });

  test('应该支持别名 headers，并且自定义 headers 优先级应该高于别名 headers', () => {
    const h1 = baseHeaders;
    const h2 = { v1: 1, v2: 2 };
    const h3 = { ...h1, ...h2 };

    keys.forEach((a) => {
      expect(flattenHeaders({ headers: h1, method: a })).toEqual(h1[a]);
      expect(flattenHeaders({ headers: h3, method: a })).toEqual(h2);
    });
  });

  test('应该支持通用 headers，并且别名 headers 优先级应该高于通用 headers', () => {
    const h1 = {
      common: {
        v1: 'common1',
        v2: 'common2',
      },
    };
    const h2 = { ...baseHeaders, ...h1 };

    keys.forEach((a) => {
      expect(flattenHeaders({ headers: h1, method: a })).toEqual(h1.common);
      expect(flattenHeaders({ headers: h2, method: a })).toEqual(h2[a]);
    });
  });

  test.each(
    keys.map((k) => [
      k,
      {
        common: {
          v1: 'common1',
          v2: 'common1',
        },
        [k]: {
          v3: `${k}1`,
          v4: `${k}2`,
        },
        v5: 5,
        v6: 6,
      },
    ]),
  )('应该获取到完整的 %s headers', (k, h) => {
    const h1 = {
      v1: 'common1',
      v2: 'common1',
      v5: 5,
      v6: 6,
    };
    const h2 = {
      ...h1,
      v3: `${k}1`,
      v4: `${k}2`,
    };

    keys.forEach((a) => {
      expect(flattenHeaders({ headers: h, method: a })).toEqual(
        a !== k ? h1 : h2,
      );
    });
  });
});
