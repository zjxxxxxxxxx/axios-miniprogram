import { isString, isUndefined } from '../helpers/isTypes';
import { deepMerge } from '../helpers/deepMerge';
import { mergeConfig } from './mergeConfig';
import {
  AxiosRequestConfig,
  AxiosRequestData,
  AxiosResponse,
  AxiosResponseData,
} from './Axios';

export interface AxiosDomainRequest {
  <TData extends AxiosResponseData>(
    /**
     * 请求配置
     */
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  <TData extends AxiosResponseData>(
    /**
     * 请求地址
     */
    url: string,
    /**
     * 请求配置
     */
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
}

export interface AxiosDomainRequestMethod {
  <TData extends AxiosResponseData>(
    /**
     * 请求地址
     */
    url: string,
    /**
     * 请求配置
     */
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
}

export interface AxiosDomainRequestMethodWithParams {
  <TData extends AxiosResponseData>(
    /**
     * 请求地址
     */
    url: string,
    /**
     * 请求参数
     */
    params?: AnyObject,
    /**
     * 请求配置
     */
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
}

export interface AxiosDomainRequestMethodWithData {
  <TData extends AxiosResponseData>(
    /**
     * 请求地址
     */
    url: string,
    /**
     * 请求数据
     */
    data?: AxiosRequestData,
    /**
     * 请求配置
     */
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
}

/**
 * 普通的请求方法名称
 */
export const requestMethodNames = ['options', 'trace', 'connect'] as const;

/**
 * 带参数的请求方法名称
 */
export const requestMethodWithParamsNames = ['head', 'get', 'delete'] as const;

/**
 * 带数据的请求方法名称
 */
export const requestMethodWithDataNames = ['post', 'put', 'patch'] as const;

export default class AxiosDomain {
  /**
   * 默认请求配置
   */
  defaults: AxiosRequestConfig;

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

  constructor(
    defaults: AxiosRequestConfig,
    processRequest: (config: AxiosRequestConfig) => Promise<AxiosResponse>,
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

      return processRequest(mergeConfig(this.defaults, config));
    };
  }
}

for (const method of requestMethodNames) {
  AxiosDomain.prototype[method] = function processRequestMethod(
    url,
    config = {},
  ) {
    config.method = method;
    return this.request(url, config);
  };
}

for (const method of requestMethodWithParamsNames) {
  AxiosDomain.prototype[method] = function processRequestMethodWithParams(
    url,
    params = {},
    config = {},
  ) {
    config.method = method;
    config.params = config.params ? deepMerge(params, config.params) : params;
    return this.request(url, config);
  };
}

for (const method of requestMethodWithDataNames) {
  AxiosDomain.prototype[method] = function processRequestMethodWithData(
    url,
    data = {},
    config = {},
  ) {
    config.method = method;
    config.data = config.data ? deepMerge(data, config.data) : data;
    return this.request(url, config);
  };
}
