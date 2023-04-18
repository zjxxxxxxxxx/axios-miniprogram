import { describe, test, expect, vi } from 'vitest';
import InterceptorManager from '@/core/InterceptorManager';

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

    expect(i.size).toBe(0);

    const id = i.use(res, rej);

    expect(i.size).toBe(1);

    i.forEach(({ resolved, rejected }) => {
      expect(resolved).toBe(res);
      expect(rejected).toBe(rej);
    });

    i.eject(id);
    i.forEach(cb);

    expect(i.size).toBe(0);

    expect(cb).not.toBeCalled();
  });

  test('应该可以清理所有拦截处理函数', () => {
    const i = new InterceptorManager();
    const res = vi.fn();
    const rej = vi.fn();

    expect(i.size).toBe(0);

    i.use(res, rej);
    i.use(res, rej);
    i.use(res, rej);

    expect(i.size).toBe(3);

    i.clear();

    expect(i.size).toBe(0);
  });

  test('应该可以调用 forEach', () => {
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
});
