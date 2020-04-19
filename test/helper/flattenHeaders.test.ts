/*
 * @Author: early-autumn
 * @Date: 2020-04-19 14:43:15
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-19 16:19:24
 */
import flattenHeaders from '../../src/helper/flattenHeaders';

describe('测试 src/helper/flattenHeaders.ts', () => {
  it('测试 容错', () => {
    expect(flattenHeaders({})).toEqual({
      Accept: 'application/json, test/plain, */*',
    });
    //  'Content-Type': 'application/json; charset=utf-8',
  });
});
