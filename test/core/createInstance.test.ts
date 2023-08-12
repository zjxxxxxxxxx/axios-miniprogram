import { describe, test, expect, vi } from 'vitest';
import { eachMethods, mockAdapter } from 'scripts/test.utils';
import { createInstance } from '@/core/createInstance';

describe('src/core/createInstance.ts', () => {
  test('应该可以创建实例', () => {
    const i = createInstance({});

    expect(i).toBeTypeOf('function');
    expect(i.defaults).toBeTypeOf('object');
    expect(i.interceptors).toBeTypeOf('object');
    expect(i.getUri).toBeTypeOf('function');
    expect(i.create).toBeTypeOf('function');
    expect(i.extend).toBeTypeOf('function');
    expect(i.use).toBeTypeOf('function');
    expect(i.request).toBeTypeOf('function');

    eachMethods((k) => {
      expect(i[k]).toBeTypeOf('function');
    });
  });

  test('应该支持合并配置', () => {
    const parent = createInstance({});
    const child = parent.create({
      baseURL: 'https://api.com',
    });

    expect(parent.defaults.baseURL).toBeUndefined();
    expect(child.defaults.baseURL).toBe('https://api.com');
  });

  test('应该支持复用拦截器', async () => {
    const parent = createInstance({
      baseURL: 'https://api.com',
    });
    const child = parent.extend({
      adapter: mockAdapter(),
    });
    const cb1 = vi.fn((config) => config);
    const cb2 = vi.fn((response) => response);
    const cb3 = vi.fn((config) => config);
    const cb4 = vi.fn((response) => response);

    parent.interceptors.request.use(cb1);
    parent.interceptors.response.use(cb2);
    child.interceptors.request.use(cb3);
    child.interceptors.response.use(cb4);

    await child('test');

    expect(cb1).toBeCalled();
    expect(cb2).toBeCalled();
    expect(cb3).toBeCalled();
    expect(cb4).toBeCalled();
  });

  test('应该支持复用中间件', async () => {
    const parent = createInstance({
      baseURL: 'https://api.com',
    });
    const child = parent.extend({
      adapter: mockAdapter(),
    });
    const cb1 = vi.fn(async (ctx, next) => {
      await next();
    });
    const cb2 = vi.fn(async (ctx, next) => {
      await next();
    });
    const cb3 = vi.fn(async (ctx, next) => {
      await next();
    });
    const cb4 = vi.fn(async (ctx, next) => {
      await next();
    });

    parent.use(cb1);
    parent.use(cb2);
    child.use(cb3);
    child.use(cb4);

    await child('test');

    expect(cb1).toBeCalled();
    expect(cb2).toBeCalled();
    expect(cb3).toBeCalled();
    expect(cb4).toBeCalled();
  });
});
