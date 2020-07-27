import CancelToken from '../../src/cancel/CancelToken';

describe('测试 src/cancel/CancelToken.ts', () => {
  it('实例化', () => {
    const token = new CancelToken(function (cancel) {
      cancel('取消');
    });

    // 应该抛出取消
    expect(() => token.throwIfRequested()).toThrow();
  });

  it('工厂方法', () => {
    const source = CancelToken.source();

    // 还没有取消 返回 Undefuned
    expect(source.token.throwIfRequested()).toBeUndefined();

    source.cancel('取消');

    // 应该抛出取消
    expect(() => source.token.throwIfRequested()).toThrow();

    // 重复取消无效
    source.cancel('取消');
  });
});
