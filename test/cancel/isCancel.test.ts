/*
 * @Author: early-autumn
 * @Date: 2020-04-20 15:12:17
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 15:17:16
 */
import isCancel from '../../src/cancel/isCancel';
import Cancel from '../../src/cancel/Cancel';

describe('测试 src/cancel/isCancel', () => {
  it('是一个取消?', () => {
    const cancel1 = 0;
    const cancel2 = new Cancel();

    expect(isCancel(cancel1)).toBe(false);
    expect(isCancel(cancel2)).toBe(true);
  });
});
