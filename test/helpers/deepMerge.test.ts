import { describe, test, expect } from 'vitest';
import { deepMerge } from '@/helpers/deepMerge';

describe('src/helpers/deepMerge.ts', () => {
  test('应该支持空参数', () => {
    const o = {
      v1: 1,
      v2: [1],
      v3: { v: 'v3' },
      v4: undefined,
      v5: null,
      v6: 'v6',
    };

    expect(deepMerge()).toEqual({});
    expect(deepMerge(undefined, undefined, undefined)).toEqual({});
    expect(deepMerge(o)).toEqual(o);
  });

  test('应该进行合并', () => {
    const o1 = {
      v1: 1,
      v2: 2,
      v3: 3,
    };
    const o2 = {
      v2: 22,
      v3: undefined,
      v4: 4,
    };

    expect(deepMerge<AnyObject>(o1, o2)).toEqual({
      ...o1,
      ...o2,
    });
  });

  test('应该合并对象里的对象', () => {
    const o1 = {
      v1: { v: 1 },
      v2: { v: 2 },
      v3: 3,
    };
    const o2 = {
      v1: { vv: 11 },
      v2: 2,
      v3: { v: 3 },
    };

    expect(deepMerge<AnyObject>(o1, o2)).toEqual({
      v1: { v: 1, vv: 11 },
      v2: 2,
      v3: { v: 3 },
    });
  });
});
