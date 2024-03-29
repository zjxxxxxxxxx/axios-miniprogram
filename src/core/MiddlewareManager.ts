import { assert } from '../helpers/error';
import { isFunction } from '../helpers/types';
import { AxiosRequestConfig, AxiosResponse } from './Axios';

export interface MiddlewareNext {
  (): Promise<void>;
}

/**
 * 中间件上下文
 */
export interface MiddlewareContext {
  /**
   * 请求体
   *
   * 同于请求配置
   */
  req: AxiosRequestConfig;
  /**
   * 响应体
   */
  res: null | AxiosResponse;
}

/**
 * 中间件
 */
export interface MiddlewareCallback {
  (ctx: MiddlewareContext, next: MiddlewareNext): Promise<void>;
}

/**
 * 中间件管理器
 */
export default class MiddlewareManager {
  /**
   * @internal
   *
   * 中间件缓存池
   */
  private middlewares: MiddlewareCallback[] = [];

  /**
   * 注册中间件
   */
  use(middleware: MiddlewareCallback) {
    assert(isFunction(middleware), 'middleware 不是一个 function');
    this.middlewares.push(middleware);
  }

  /**
   * @internal
   *
   * 创建中间件上下文
   */
  createContext(config: AxiosRequestConfig): MiddlewareContext {
    return {
      req: config,
      res: null,
    };
  }

  /**
   * @internal
   *
   * 运行中间件
   *
   * @param ctx 中间件上下文
   * @param respond 目标函数
   */
  run(ctx: MiddlewareContext, respond: MiddlewareCallback) {
    const middlewares = [...this.middlewares, respond];
    async function next() {
      await middlewares.shift()!(ctx, next);
    }
    return next();
  }

  /**
   * @internal
   *
   * 强化运行中间件
   *
   * @param enhancer 强化器
   */
  enhanceRun(enhancer: MiddlewareManager['run']): MiddlewareManager['run'] {
    return (ctx, respond) => {
      return enhancer(ctx, () => this.run(ctx, respond));
    };
  }
}
