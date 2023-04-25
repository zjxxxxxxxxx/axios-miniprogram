import { assert } from '../helpers/error';
import { combineURL } from '../helpers/combineURL';
import { isFunction, isString } from '../helpers/isTypes';

export interface MiddlewareNext {
  (): Promise<void>;
}

export interface MiddlewareCallback<Context extends AnyObject> {
  (ctx: Context, next: MiddlewareNext): Promise<void>;
}

export interface MiddlewareUse<Context extends AnyObject> {
  /**
   * 添加中间件
   *
   * @param path 中间件路径
   * @param callback 中间件回调
   */
  (
    path: string,
    callback: MiddlewareCallback<Context>,
  ): MiddlewareManager<Context>;
  /**
   * 添加中间件
   *
   * @param callback 中间件回调
   */
  (callback: MiddlewareCallback<Context>): MiddlewareManager<Context>;
}

export default class MiddlewareManager<Context extends AnyObject = AnyObject> {
  #map = new Map<string, MiddlewareCallback<Context>[]>();

  /**
   * 添加中间件
   */
  use: MiddlewareUse<Context> = (
    path: string | MiddlewareCallback<Context>,
    callback?: MiddlewareCallback<Context>,
  ) => {
    if (isFunction(path)) {
      callback = path;
      path = '/';
    }
    assert(isString(path), 'path 不是一个 string');
    assert(!!path, 'path 不是一个长度大于零的 string');
    assert(isFunction(callback), 'callback 不是一个 function');

    const middlewares = this.#map.get(path) ?? [];
    middlewares.push(callback!);
    this.#map.set(path, middlewares);

    return this;
  };

  flush(ctx: Context, finish: MiddlewareNext) {
    const allMiddlewares: MiddlewareCallback<Context>[] = [];

    for (const [path, middlewares] of this.#map.entries()) {
      const url = combineURL(ctx.req.baseURL, path);
      const checkRE = new RegExp(`^${url}([/?].*)?`);

      if (path === '/') {
        allMiddlewares.push(...middlewares);
      } else if (checkRE.test(ctx.req.url!)) {
        allMiddlewares.push(...middlewares);
      }
    }

    const tasks = [...allMiddlewares, finish];
    return (function next(): Promise<void> {
      return tasks.shift()!(ctx, next);
    })();
  }
}
