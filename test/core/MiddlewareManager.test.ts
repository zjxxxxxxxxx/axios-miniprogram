import { describe, test, expect, vi } from 'vitest';
import MiddlewareManager, { MiddlewareContext } from '@/core/MiddlewareManager';
import { AxiosResponse } from '@/index';

describe('src/core/MiddlewareManager.ts', () => {
  test('应该有这些实例属性', () => {
    const m = new MiddlewareManager();

    expect(m.use).toBeTypeOf('function');
    expect(m.wrap).toBeTypeOf('function');
  });

  test('应该抛出异常', () => {
    const m = new MiddlewareManager();

    expect(() => m.use(undefined as any)).toThrowError(
      '[axios-miniprogram]: callback 不是一个 function',
    );
  });

  test('应该支持添加中间件', () => {
    const m = new MiddlewareManager();
    const c: MiddlewareContext = {
      req: {},
      res: null,
    };
    const res = {} as AxiosResponse;

    const cb = vi.fn(async (ctx, next) => {
      await next();
    });
    const flush = vi.fn(async () => {
      c.res = res;
    });

    m.use(cb);
    m.wrap(c, flush);

    expect(cb).toBeCalled();
    expect(flush).toBeCalled();
  });

  test('应该支持洋葱模型', async () => {
    const m = new MiddlewareManager();
    const c: MiddlewareContext = {
      req: {},
      res: null,
    };
    const res = {} as AxiosResponse;

    const cb1 = vi.fn(async (ctx, next) => {
      // 1
      expect(ctx.req.step).toBeUndefined();
      ctx.req.step = 'cb1 start';
      await next();
      // 8
      expect(ctx.res.step).toBe('cb2 end');
      ctx.res.step = 'cb1 end';
    });
    const cb2 = vi.fn((ctx, next) => {
      // 2
      expect(ctx.req.step).toBe('cb1 start');
      ctx.req.step = 'cb2 start';
      return next().then(() => {
        // 7
        expect(ctx.res.step).toBe('cb3 end');
        ctx.res.step = 'cb2 end';
      });
    });
    const cb3 = vi.fn(async (ctx, next) => {
      // 3
      expect(ctx.req.step).toBe('cb2 start');
      ctx.req.step = 'cb3 start';
      await next();
      // 6
      expect(ctx.res.step).toBe('flush end');
      ctx.res.step = 'cb3 end';
    });
    const flush = vi.fn(async () => {
      // 4
      expect(c.req.step).toBe('cb3 start');
      c.req.step = 'flush start';
      c.res = res;
      // 5
      expect(c.res.step).toBeUndefined();
      c.res.step = 'flush end';
    });

    m.use(cb1);
    m.use(cb2);
    m.use(cb3);
    await m.wrap(c, flush);

    expect(c.req.step).toBe('flush start');
    expect(c.res!.step).toBe('cb1 end');
    expect(cb1).toBeCalled();
    expect(cb2).toBeCalled();
    expect(cb3).toBeCalled();
    expect(flush).toBeCalled();
  });
});
