import { describe, test, expect, vi } from 'vitest';
import InterceptorManager from 'src/core/InterceptorManager';

describe('src/core/InterceptorManager.ts', () => {
  test('应该有这些实例属性', () => {
    const i = new InterceptorManager();

    expect(i.use).toBeTypeOf('function');
    expect(i.eject).toBeTypeOf('function');
    expect(i.forEach).toBeTypeOf('function');
  });

  test('应该可以添加和删除拦截处理函数', () => {
    const i = new InterceptorManager();
    const res = vi.fn();
    const rej = vi.fn();
    const cb = vi.fn();

    const id = i.use(res, rej);

    i.forEach(({ resolved, rejected }) => {
      expect(resolved).toBe(res);
      expect(rejected).toBe(rej);
    });

    i.eject(id);
    i.forEach(cb);

    expect(cb).not.toBeCalled();
  });

  test('应该可以依次执行拦截处理函数', () => {
    const i = new InterceptorManager();
    const res1 = vi.fn();
    const rej1 = vi.fn();
    const res2 = vi.fn();
    const rej2 = vi.fn();
    const cb = vi.fn();

    i.use(res1, rej1);
    i.use(res2, rej2);
    i.forEach(cb);

    expect(cb.mock.calls[0][0]).toEqual({
      resolved: res1,
      rejected: rej1,
    });
    expect(cb.mock.calls[1][0]).toEqual({
      resolved: res2,
      rejected: rej2,
    });
  });

  test('应该可以反向依次执行拦截处理函数', () => {
    const i = new InterceptorManager();
    const res1 = vi.fn();
    const rej1 = vi.fn();
    const res2 = vi.fn();
    const rej2 = vi.fn();
    const cb = vi.fn();

    i.use(res1, rej1);
    i.use(res2, rej2);
    i.forEach(cb, true);

    expect(cb.mock.calls[0][0]).toEqual({
      resolved: res2,
      rejected: rej2,
    });
    expect(cb.mock.calls[1][0]).toEqual({
      resolved: res1,
      rejected: rej1,
    });
  });
});
