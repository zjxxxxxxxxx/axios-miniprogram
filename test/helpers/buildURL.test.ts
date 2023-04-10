import { describe, test, expect } from 'vitest';
import { buildURL } from 'src/helpers/buildURL';

describe('src/helpers/buildURL.ts', () => {
  test('应该支持空参数', () => {
    expect(buildURL('/test')).toBe('/test');
  });

  test('应该对参数进行系列化', () => {
    expect(
      buildURL('/test', {
        v1: 1,
        v2: undefined,
        v3: null,
        v4: '4',
        v5: NaN,
      }),
    ).toBe('/test?v1=1&v4=4');

    expect(
      buildURL('/test?v1=1', {
        v2: 2,
      }),
    ).toBe('/test?v1=1&v2=2');
  });

  test('应该对数组进行系列化', () => {
    expect(
      buildURL('/test', {
        arr: [],
      }),
    ).toBe('/test');
    expect(
      buildURL('/test', {
        arr: [1, 2],
      }),
    ).toBe('/test?arr[]=1&arr[]=2');
  });

  test('应该对对象进行系列化', () => {
    expect(
      buildURL('/test', {
        obj: {},
      }),
    ).toBe('/test');
    expect(
      buildURL('/test', {
        obj: {
          k1: 1,
          k2: 2,
        },
      }),
    ).toBe('/test?obj[k1]=1&obj[k2]=2');
  });

  test('应该对日期进行系列化', () => {
    const d = new Date();
    expect(buildURL('/test', { date: d })).toBe(
      `/test?date=${d.toISOString()}`,
    );
  });

  test('应该支持自定义序列化器', () => {
    expect(buildURL('/test', {}, () => 'v1=1&v2=2')).toBe('/test?v1=1&v2=2');
    expect(buildURL('/test?v1=1', {}, () => 'v2=2&v3=3')).toBe(
      '/test?v1=1&v2=2&v3=3',
    );
  });
});
