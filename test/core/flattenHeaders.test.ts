/*
 * @Author: early-autumn
 * @Date: 2020-04-19 14:43:15
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 00:51:13
 */
import flattenHeaders from '../../src/core/flattenHeaders';

describe('测试 src/helpers/flattenHeaders.ts', () => {
  it('测试 容错', () => {
    expect(flattenHeaders({})).toEqual({});
    //  'Content-Type': 'application/json; charset=utf-8',
  });
});
