import { assert } from '../helpers/error';
import { combineURL } from '../helpers/combineURL';
import { isFunction } from '../helpers/isTypes';
import { AxiosRequestConfig, AxiosResponse } from './Axios';

export interface MiddlewareContext {
  req: AxiosRequestConfig;
  res: null | AxiosResponse;
}

export interface MiddlewareNext {
  (): Promise<void>;
}

export interface MiddlewareCallback {
  (ctx: MiddlewareContext, next: MiddlewareNext): Promise<void>;
}

export interface MiddlewareFlush {
  (ctx: MiddlewareContext): Promise<void>;
}

export default class MiddlewareManager {
  #map = new Map<string, MiddlewareCallback[]>();

  use(callback: MiddlewareCallback): MiddlewareManager;
  use(path: string, callback: MiddlewareCallback): MiddlewareManager;
  use(path: string | MiddlewareCallback, callback?: MiddlewareCallback) {
    if (isFunction(path)) {
      callback = path;
      path = '/';
    }
    assert(!!path, 'path 不是一个非空的 string');

    const middlewares = this.#map.get(path) ?? [];
    middlewares.push(callback!);
    this.#map.set(path, middlewares);

    return this;
  }

  wrap(flush: MiddlewareFlush): MiddlewareFlush {
    return (ctx) => this.#performer(ctx, flush);
  }

  #performer(ctx: MiddlewareContext, flush: MiddlewareFlush) {
    const middlewares = [...this.#getAllMiddlewares(ctx), flush];

    function next(): Promise<void> {
      return middlewares.shift()!(ctx, next);
    }

    return next();
  }

  #getAllMiddlewares(ctx: MiddlewareContext) {
    const allMiddlewares: MiddlewareCallback[] = [];

    for (const [path, middlewares] of this.#map.entries()) {
      const url = combineURL(ctx.req.baseURL, path);

      const checkRE = new RegExp(`^${url}([/?].*)?`);
      if (checkRE.test(ctx.req.url!)) {
        allMiddlewares.push(...middlewares);
      }
    }

    return allMiddlewares;
  }
}
