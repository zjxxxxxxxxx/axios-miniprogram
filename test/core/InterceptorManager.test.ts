/*
 * @Author: early-autumn
 * @Date: 2020-04-20 15:40:44
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 22:05:48
 */
import InterceptorManager from '../../src/core/InterceptorManager';

describe('测试 src/core/InterceptorManager.ts', () => {
  it('实例化', () => {
    const interceptor = new InterceptorManager();
    const executor = jest.fn();

    interceptor.forEach(executor);

    // executor 不应该被执行
    expect(executor.mock.calls.length).toBe(0);
  });

  it('注册和取消注册', () => {
    const interceptor = new InterceptorManager();
    const executor1 = jest.fn();
    const executor2 = jest.fn();
    const id1 = interceptor.use(() => undefined);
    const id2 = interceptor.use(() => undefined);
    interceptor.forEach(executor1);

    // executor1 应该被执行了两次
    expect(executor1.mock.calls.length).toBe(2);

    interceptor.eject(id1);
    interceptor.eject(id2);
    interceptor.forEach(executor2);

    // executor2 不应该被执行
    expect(executor2.mock.calls.length).toBe(0);
  });

  it('倒序遍历', () => {
    const interceptor = new InterceptorManager();
    let id = 0;

    // 应该后被执行
    interceptor.use((id) => expect(id).toBe(1));

    // 应该先被执行
    interceptor.use((id) => expect(id).toBe(0));

    interceptor.forEach(({ resolved }) => {
      resolved(id++);
    }, 'reverse');
  });

  it('异常', () => {
    const interceptor = new InterceptorManager();

    interceptor.use(() => undefined);

    interceptor.forEach(({ rejected }) => rejected('error'));
  });
});
