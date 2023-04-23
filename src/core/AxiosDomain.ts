import {
  PLAIN_METHODS,
  WITH_DATA_METHODS,
  WITH_PARAMS_METHODS,
} from '../constants/methods';
import { isString, isUndefined } from '../helpers/isTypes';
import { deepMerge } from '../helpers/deepMerge';
import { combineURL } from '../helpers/combineURL';
import { dispatchRequest } from '../request/dispatchRequest';
import { mergeConfig } from './mergeConfig';
import {
  AxiosRequestConfig,
  AxiosRequestData,
  AxiosResponse,
  AxiosResponseData,
} from './Axios';
import MiddlewareManager, {
  MiddlewareContext,
  MiddlewareFlush,
} from './MiddlewareManager';

/**
 * 请求函数
 */
export interface AxiosDomainRequest {
  <TData extends AxiosResponseData>(config: AxiosRequestConfig): Promise<
    AxiosResponse<TData>
  >;
  <TData extends AxiosResponseData>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
}

/**
 * 普通的请求方法
 */
export type AxiosDomainRequestMethod = <TData extends AxiosResponseData>(
  url: string,
  config?: AxiosRequestConfig,
) => Promise<AxiosResponse<TData>>;

/**
 * 带参数的请求方法
 */
export type AxiosDomainRequestMethodWithParams = <
  TData extends AxiosResponseData,
>(
  url: string,
  params?: AnyObject,
  config?: AxiosRequestConfig,
) => Promise<AxiosResponse<TData>>;

/**
 * 带数据的请求方法
 */
export type AxiosDomainRequestMethodWithData = <
  TData extends AxiosResponseData,
>(
  url: string,
  data?: AxiosRequestData,
  config?: AxiosRequestConfig,
) => Promise<AxiosResponse<TData>>;

export interface AxiosDomainRequestHandler {
  (config: AxiosRequestConfig): Promise<AxiosResponse>;
}

export default class AxiosDomain {
  /**
   * 默认请求配置
   */
  defaults: AxiosRequestConfig;

  middleware = new MiddlewareManager();

  /**
   * 发送请求
   */
  request!: AxiosDomainRequest;

  /**
   * 发送 options 请求
   */
  options!: AxiosDomainRequestMethod;

  /**
   * 发送 get 请求
   */
  get!: AxiosDomainRequestMethodWithParams;

  /**
   * 发送 head 请求
   */
  head!: AxiosDomainRequestMethodWithParams;

  /**
   * 发送 post 请求
   */
  post!: AxiosDomainRequestMethodWithData;

  /**
   * 发送 put 请求
   */
  put!: AxiosDomainRequestMethodWithData;

  /**
   * 发送 patch 请求
   */
  patch!: AxiosDomainRequestMethodWithData;

  /**
   * 发送 delete 请求
   */
  delete!: AxiosDomainRequestMethodWithParams;

  /**
   * 发送 trace 请求
   */
  trace!: AxiosDomainRequestMethod;

  /**
   * 发送 connect 请求
   */
  connect!: AxiosDomainRequestMethod;

  flush: MiddlewareFlush;

  constructor(
    defaults: AxiosRequestConfig,
    processRequest: (
      config: AxiosRequestConfig,
      requestHandler: AxiosDomainRequestHandler,
    ) => Promise<AxiosResponse>,
  ) {
    this.defaults = defaults;

    this.request = (
      urlOrConfig: string | AxiosRequestConfig,
      config: AxiosRequestConfig = {},
    ) => {
      if (isString(urlOrConfig)) {
        config.url = urlOrConfig;
      } else {
        config = urlOrConfig;
      }

      if (isUndefined(config.method)) {
        config.method = 'get';
      }

      return processRequest(
        mergeConfig(this.defaults, config),
        this.#requestHandler,
      );
    };
    this.flush = this.middleware.wrap(async (ctx) => {
      ctx.res = await dispatchRequest(ctx.req);
    });
  }

  #requestHandler: AxiosDomainRequestHandler = async (config) => {
    config.url = combineURL(config.baseURL, config.url);
    const ctx: MiddlewareContext = {
      req: config,
      res: null,
    };
    await this.flush(ctx);
    return ctx.res as AxiosResponse;
  };
}

for (const method of PLAIN_METHODS) {
  AxiosDomain.prototype[method] = function processRequestMethod(
    url,
    config = {},
  ) {
    config.method = method;
    return this.request(url, config);
  };
}

for (const method of WITH_PARAMS_METHODS) {
  AxiosDomain.prototype[method] = function processRequestMethodWithParams(
    url,
    params = {},
    config = {},
  ) {
    config.method = method;
    config.params = deepMerge(params, config.params ?? {});
    return this.request(url, config);
  };
}

for (const method of WITH_DATA_METHODS) {
  AxiosDomain.prototype[method] = function processRequestMethodWithData(
    url,
    data,
    config = {},
  ) {
    config.method = method;
    config.data = data;
    return this.request(url, config);
  };
}
