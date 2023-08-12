import { describe, test, expect } from 'vitest';
import { ignore, orgIgnore } from '@/helpers/ignore';

describe('src/helpers/ignore.ts', () => {
  test('不应该改变传递的对象', () => {
    expect(ignore({ v1: 1 })).toEqual({ v1: 1 });
  });

  test('应该不改变源对象', () => {
    const o = {
      v1: 1,
    };

    expect(ignore(o, 'v1')).toEqual({});
    expect(o).toEqual({
      v1: 1,
    });
  });

  test('应该忽略指定键值', () => {
    const o = {
      v1: 1,
      v2: {},
      v3: [],
    };

    expect(ignore(o, 'v1')).toEqual({
      v2: {},
      v3: [],
    });
    expect(ignore(o, 'v2')).toEqual({
      v1: 1,
      v3: [],
    });
    expect(ignore(o, 'v3')).toEqual({
      v1: 1,
      v2: {},
    });
    expect(ignore(o, 'v1', 'v2')).toEqual({
      v3: [],
    });
    expect(ignore(o, 'v2', 'v3')).toEqual({
      v1: 1,
    });
    expect(ignore(o, 'v1', 'v3')).toEqual({
      v2: {},
    });
    expect(ignore(o, 'v1', 'v2', 'v3')).toEqual({});
  });

  test('应该从源对象删除', () => {
    const o = {
      v1: 1,
      v2: {},
      v3: [],
    };

    orgIgnore(o, ['v1']);

    expect(o).toEqual({
      v2: {},
      v3: [],
    });

    orgIgnore(o, ['v2']);

    expect(o).toEqual({
      v3: [],
    });

    orgIgnore(o, ['v3']);

    expect(o).toEqual({});
  });
});
