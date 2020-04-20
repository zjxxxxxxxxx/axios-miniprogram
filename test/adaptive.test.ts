/*
 * @Author: early-autumn
 * @Date: 2020-04-20 17:22:26
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 22:20:47
 */
import adaptive from '../src/adaptive';

declare global {
  namespace NodeJS {
    interface Global {
      wx: any;
    }
  }
}

describe('测试 src/adaptive.ts', () => {
  it('适配成功', () => {
    const request = jest.fn();
    global.wx = {
      request,
    };

    const adapter = adaptive();

    expect(adapter).toBe(request);
  });

  it('适配失败', () => {
    global.wx = undefined;

    expect(adaptive()).toBeUndefined();
  });
});
