import { describe, test, expect } from 'vitest';
import { buildURL } from 'src/helpers/buildURL';

describe('src/helpers/buildURL.ts', () => {
  test('应该支持空参数', () => {
    expect(buildURL('/user')).toBe('/user');
  });

  test('应该清理哈希值', () => {
    expect(buildURL('/user#hash')).toBe('/user');
  });

  test('应该对参数进行系列化', () => {
    expect(
      buildURL('/user#hash', {
        v1: 1,
        v2: undefined,
        v3: null,
        v4: '4',
        v5: NaN,
      }),
    ).toBe('/user?v1=1&v4=4');

    expect(
      buildURL('/user?v1=1', {
        v2: 2,
      }),
    ).toBe('/user?v1=1&v2=2');
  });

  test('应该对数组进行系列化', () => {
    expect(
      buildURL('/user', {
        arr: [1, 2],
      }),
    ).toBe('/user?arr[]=1&arr[]=2');
  });

  test('应该对对象进行系列化', () => {
    expect(
      buildURL('/user', {
        obj: {
          k1: 1,
          k2: 2,
        },
      }),
    ).toBe('/user?obj[k1]=1&obj[k2]=2');
  });

  test('应该对日期进行系列化', () => {
    const date = new Date();
    expect(buildURL('/user', { date })).toBe(
      `/user?date=${date.toISOString()}`,
    );
  });

  test('应该支持自定义序列化器', () => {
    expect(buildURL('/user', {}, () => 'v1=1&v2=2')).toBe('/user?v1=1&v2=2');
    expect(buildURL('/user?v1=1', {}, () => 'v2=2&v3=3')).toBe(
      '/user?v1=1&v2=2&v3=3',
    );
  });
});
