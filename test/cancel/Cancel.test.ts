/*
 * @Author: early-autumn
 * @Date: 2020-04-20 15:09:33
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 15:17:27
 */
import Cancel from '../../src/cancel/Cancel';

describe('测试 src/cancel/Cancel.ts', () => {
  it('默认', () => {
    const cancel = new Cancel();

    expect(cancel.toString()).toBe('Cancel');
  });

  it('自定义', () => {
    const cancel = new Cancel('custom');

    expect(cancel.toString()).toBe('Cancel: custom');
  });
});
