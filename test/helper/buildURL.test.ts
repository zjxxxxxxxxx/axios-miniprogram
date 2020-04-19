/*
 * @Author: early-autumn
 * @Date: 2020-04-19 14:34:13
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-19 23:16:55
 */
import buildURL from '../../src/helpers/buildURL';

describe('测试 /helpers/buildURL.ts', () => {
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

  it('delete hash', () => {
    expect(buildURL('/test#192929')).toBe('/test');
  });
});
