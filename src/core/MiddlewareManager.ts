import { assert } from '../helpers/error';
import { combineURL } from '../helpers/combineURL';
import { isFunction, isString } from '../helpers/isTypes';

export interface MiddlewareNext {
  (): Promise<void>;
}

export interface MiddlewareCallback<Conext extends AnyObject> {
  (ctx: Conext, next: MiddlewareNext): Promise<void>;
}

export interface MiddlewareFlush<Conext extends AnyObject> {
  (ctx: Conext): Promise<void>;
}

export default class MiddlewareManager<Conext extends AnyObject = AnyObject> {
  #map = new Map<string, MiddlewareCallback<Conext>[]>();

  flush: MiddlewareFlush<Conext>;

  constructor(flush: MiddlewareFlush<Conext>) {
    this.flush = this.wrap(flush);
  }

  use(callback: MiddlewareCallback<Conext>): MiddlewareManager<Conext>;
  use(
    path: string,
    callback: MiddlewareCallback<Conext>,
  ): MiddlewareManager<Conext>;
  use(
    path: string | MiddlewareCallback<Conext>,
    callback?: MiddlewareCallback<Conext>,
  ) {
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
  }

  wrap(flush: MiddlewareFlush<Conext>): MiddlewareFlush<Conext> {
    return (ctx) => {
      const allMiddlewares: MiddlewareCallback<Conext>[] = [];

      for (const [path, middlewares] of this.#map.entries()) {
        const url = combineURL(ctx.req.baseURL, path);
        const checkRE = new RegExp(`^${url}([/?].*)?`);

        if (path === '/') {
          allMiddlewares.push(...middlewares);
        } else if (checkRE.test(ctx.req.url!)) {
          allMiddlewares.push(...middlewares);
        }
      }

      const tasks = [...allMiddlewares, flush];
      return (function next(): Promise<void> {
        return tasks.shift()!(ctx, next);
      })();
    };
  }
}
