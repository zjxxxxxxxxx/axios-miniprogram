import { assert } from '../helpers/error';
import { combineURL } from '../helpers/combineURL';
import { isFunction, isString } from '../helpers/isTypes';
import { AxiosRequestConfig, AxiosResponse } from './Axios';

export interface MiddlewareNext {
  (): Promise<void>;
}

export interface MiddlewareContext {
  req: AxiosRequestConfig;
  res: null | AxiosResponse;
}

export interface MiddlewareCallback {
  (ctx: MiddlewareContext, next: MiddlewareNext): Promise<void>;
}

export interface MiddlewareUse {
  /**
   * 添加中间件
   *
   * @param callback 中间件回调
   */
  (callback: MiddlewareCallback): MiddlewareManager;
}

export default class MiddlewareManager {
  /**
   * 中间件
   */
  #middlewares: MiddlewareCallback[] = [];

  /**
   * 添加中间件
   */
  use: MiddlewareUse = (callback: MiddlewareCallback) => {
    assert(isFunction(callback), 'callback 不是一个 function');
    this.#middlewares.push(callback!);
    return this;
  };

  /**
   * 包装器
   *
   * @param ctx 中间件上下文
   * @param flush 目标函数
   */
  wrap(ctx: MiddlewareContext, flush: MiddlewareNext) {
    const runners = [...this.#middlewares, flush];
    return (function next(): Promise<void> {
      return runners.shift()!(ctx, next);
    })();
  }
}
