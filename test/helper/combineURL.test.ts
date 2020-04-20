/*
 * @Author: early-autumn
 * @Date: 2020-04-20 09:42:17
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 09:58:41
 */
import combineURL from '../../src/helpers/combineURL';

describe('测试 src/helpers/combineURL.ts', () => {
  it('run', () => {
    expect(combineURL('1/2', '3/4')).toBe('1/2/3/4');
    expect(combineURL('1/2///', '////3/4')).toBe('1/2/3/4');
  });
});
