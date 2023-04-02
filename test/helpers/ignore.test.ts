import { describe, test, expect } from 'vitest';
import { ignore } from 'src/helpers/ignore';

describe('src/helpers/ignore.ts', () => {
  test('不应该改变传入的对象', () => {
    expect(
      ignore({
        v1: 1,
      }),
    ).toEqual({
      v1: 1,
    });
  });

  test('应该忽略指定键值', () => {
    expect(
      ignore(
        {
          v1: 1,
          v2: {},
          v3: [],
          v4: undefined,
          v5: 5,
          v6: null,
        },
        'v1',
        'v2',
        'v3',
        'v4',
      ),
    ).toEqual({ v5: 5, v6: null });
  });
});
