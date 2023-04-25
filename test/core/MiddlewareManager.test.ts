import { describe, test, expect, vi } from 'vitest';
import MiddlewareManager from '@/core/MiddlewareManager';

describe('src/core/MiddlewareManager.ts', () => {
  test('应该有这些实例属性', () => {
    const m = new MiddlewareManager(vi.fn());

    expect(m.use).toBeTypeOf('function');
    expect(m.wrap).toBeTypeOf('function');
  });

  test('应该可以添加中间件回调', async () => {
    const flush = vi.fn(async (ctx) => {
      expect(ctx.req.url).toBe('test');
      ctx.res = res;
    });
    const m = new MiddlewareManager(flush);
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

    m.use(midde);
    await m.flush(ctx);

    expect(ctx.res).toBe(res);
    expect(midde).toBeCalled();
  });

  test('应该可以给路径添加中间件回调', async () => {
    const flush = vi.fn(async (ctx) => {
      ctx.res = res;
    });

    const m = new MiddlewareManager(flush);
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

    m.use('/test', midde);
    await m.flush(ctx1);

    expect(ctx1.res).toBe(res);
    expect(midde).not.toBeCalled();

    m.use('/test', midde);
    await m.flush(ctx2);

    expect(midde).toBeCalled();
  });
});
