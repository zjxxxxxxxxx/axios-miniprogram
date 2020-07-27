import buildURL from '../../src/helpers/buildURL';

describe('测试 src/helpers/buildURL.ts', () => {
  it('url', () => {
    expect(buildURL('/test')).toBe('/test');
    expect(buildURL('/test?id=1')).toBe('/test?id=1');
  });

  it('url + params', () => {
    expect(
      buildURL('/test', {
        test: 1,
      })
    ).toBe('/test?test=1');
    expect(
      buildURL('/test?id=1', {
        test: 1,
      })
    ).toBe('/test?id=1&test=1');
  });

  it('url + params + paramsSerializer', () => {
    expect(
      buildURL(
        '/test',
        {
          test: 1,
        },
        () => 'paramsSerializer=ok'
      )
    ).toBe('/test?paramsSerializer=ok');
    expect(
      buildURL(
        '/test?id=1',
        {
          test: 1,
        },
        () => 'paramsSerializer=ok'
      )
    ).toBe('/test?id=1&paramsSerializer=ok');
  });

  it('params 是数组', () => {
    expect(
      buildURL('/test', {
        ids: [1],
      })
    ).toBe('/test?ids[]=1');
  });

  it('params 是时间对象', () => {
    const date = new Date();
    expect(
      buildURL('/test', {
        date,
      })
    ).toBe(`/test?date=${date.toISOString()}`);
  });

  it('params 是普通对象', () => {
    const obj = {};
    expect(
      buildURL('/test', {
        obj,
      })
    ).toBe(`/test?obj=%7B%7D`);
  });

  it('删除哈希', () => {
    expect(buildURL('/test#192929')).toBe('/test');
  });

  it('容错', () => {
    expect(
      buildURL('/test', {
        null: null,
        undefined: void 0,
        NaN: NaN,
      })
    ).toBe('/test');
  });
});
