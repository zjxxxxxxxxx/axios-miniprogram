import { describe, test, expect } from 'vitest';
import { deepMerge } from 'src/helpers/deepMerge';

describe('src/helpers/deepMerge.ts', () => {
  test('应该支持空参数', () => {
    expect(deepMerge()).toEqual({});
  });

  test('应该直接返回第一个参数', () => {
    expect(
      deepMerge({
        v1: 1,
        v2: [1],
        v3: { v: 'v3' },
        v4: undefined,
        v5: null,
        v6: 'v6',
      }),
    ).toEqual({
      v1: 1,
      v2: [1],
      v3: { v: 'v3' },
      v4: undefined,
      v5: null,
      v6: 'v6',
    });
  });

  test('应该进行合并', () => {
    expect(
      deepMerge(
        {
          v1: 1,
          v2: 2,
          v3: 3,
        },
        {
          v2: 22,
          v3: undefined,
          v4: 4,
        },
      ),
    ).toEqual({
      v1: 1,
      v2: 22,
      v3: undefined,
      v4: 4,
    });
  });

  test('应该合并对象里的对象', () => {
    expect(
      deepMerge(
        {
          v1: { v: 1 },
          v2: { v: 2 },
          v3: 3,
        },
        {
          v1: { vv: 11 },
          v2: 2,
          v3: { v: 3 },
        },
      ),
    ).toEqual({
      v1: { v: 1, vv: 11 },
      v2: 2,
      v3: { v: 3 },
    });
  });
});
