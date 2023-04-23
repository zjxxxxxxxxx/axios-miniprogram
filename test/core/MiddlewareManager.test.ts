import { describe, test, expect, vi } from 'vitest';
import MiddlewareManager from '@/core/MiddlewareManager';

describe('src/core/MiddlewareManager.ts', () => {
  test('应该有这些实例属性', () => {
    const m = new MiddlewareManager();

    expect(m.use).toBeTypeOf('function');
    expect(m.wrap).toBeTypeOf('function');
  });

  test('应该可以添加中间件回调', async () => {
    const m = new MiddlewareManager();
    const ctx = {
      req: { url: 'https://api.com' },
      res: null,
    };
    const res = {
      'src/core/MiddlewareManager.ts': true,
    };
    const midde = vi.fn(async (ctx, next) => {
      expect(ctx).toBe(ctx);
      ctx.req.url = 'test';
      await next();
      expect(ctx.res).toBe(res);
    });
    const flush = vi.fn(async (ctx) => {
      expect(ctx.req.url).toBe('test');
      ctx.res = res;
    });

    m.use(midde);
    await m.wrap(flush)(ctx);

    expect(ctx.res).toBe(res);
    expect(midde).toBeCalled();
  });

  test('应该可以给路径添加中间件回调', async () => {
    const m = new MiddlewareManager();
    const ctx1 = {
      req: {
        baseURL: 'https://api.com',
        url: 'https://api.com',
      },
      res: null,
    };
    const ctx2 = {
      req: {
        baseURL: 'https://api.com',
        url: 'https://api.com/test',
      },
      res: null,
    };
    const res = {
      'src/core/MiddlewareManager.ts': true,
    };
    const midde = vi.fn(async (ctx, next) => {
      expect(ctx).toBe(ctx);
      await next();
      expect(ctx.res).toBe(res);
    });
    const flush = vi.fn(async (ctx) => {
      ctx.res = res;
    });

    m.use('/test', midde);
    await m.wrap(flush)(ctx1);

    expect(ctx1.res).toBe(res);
    expect(midde).not.toBeCalled();

    m.use('/test', midde);
    await m.wrap(flush)(ctx2);

    expect(midde).toBeCalled();
  });
});
