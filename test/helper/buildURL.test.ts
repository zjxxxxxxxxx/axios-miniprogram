/*
 * @Author: early-autumn
 * @Date: 2020-04-19 14:34:13
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-19 14:40:57
 */
import buildURL from '../../src/helper/buildURL';

describe('测试 /helper/buildURL.ts', () => {
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
});
