/*
 * @Author: early-autumn
 * @Date: 2020-04-20 15:17:50
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 22:10:39
 */
import CancelToken from '../../src/cancel/CancelToken';

describe('测试 src/cancel/CancelToken.ts', () => {
  it('实例化', (done) => {
    const token = new CancelToken(function(cancel) {
      cancel('取消');
    });

    setTimeout(() => {
      // 应该抛出取消
      expect(() => token.throwIfRequested()).toThrow();

      done();
    });
  });

  it('工厂方法', async () => {
    const source = CancelToken.source();

    // 还没有取消 返回 Undefuned
    expect(source.token.throwIfRequested()).toBeUndefined();

    await source.cancel('取消');

    // 应该抛出取消
    expect(() => source.token.throwIfRequested()).toThrow();

    // 重复取消无效
    await source.cancel('取消');
  });
});
