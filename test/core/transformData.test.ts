import { describe, test, expect } from 'vitest';
import { transformData } from 'src/core/transformData';

describe('src/core/transformData.ts', () => {
  test('应该支持空配置', () => {
    expect(transformData()).toBeUndefined();
    expect(transformData({})).toEqual({});
  });

  test('应该支持转换器', () => {
    const h = {
      type: 0,
    };
    const d = {
      v1: 1,
    };
    const t = {
      v2: 2,
    };

    const fn = (data: any, headers: any) => {
      expect(data).toEqual(d);
      expect(headers).toEqual(h);
      return t;
    };

    expect(transformData(d, h, fn)).toEqual(t);
  });

  test('应该支持转换器数组', () => {
    const h = {
      type: 0,
    };
    const d = {
      v1: 1,
    };
    const t1 = {
      v2: 2,
    };
    const t2 = {
      v3: 3,
    };

    const fn1 = (data: any, headers: any) => {
      expect(data).toEqual(d);
      expect(headers).toEqual(h);
      return t1;
    };

    const fn2 = (data: any, headers: any) => {
      expect(data).toEqual(t1);
      expect(headers).toEqual(h);
      return t2;
    };

    expect(transformData(d, h, [fn1, fn2])).toEqual(t2);
  });
});
