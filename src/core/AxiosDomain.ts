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

export interface AxiosDomainAsRequest {
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

export interface AxiosDomainAsRequestWithParams {
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

export interface AxiosDomainAsRequestWithData {
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

export default class AxiosDomain {
  /**
   * 普通请求别名
   */
  static as = ['options', 'trace', 'connect'] as const;

  /**
   * 带请求参数的请求别名
   */
  static asp = ['head', 'get', 'delete'] as const;

  /**
   * 带请求数据的请求别名
   */
  static asd = ['post', 'put'] as const;

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
  options!: AxiosDomainAsRequest;

  /**
   * 发送 get 请求
   */
  get!: AxiosDomainAsRequestWithParams;

  /**
   * 发送 head 请求
   */
  head!: AxiosDomainAsRequestWithParams;

  /**
   * 发送 post 请求
   */
  post!: AxiosDomainAsRequestWithData;

  /**
   * 发送 put 请求
   */
  put!: AxiosDomainAsRequestWithData;

  /**
   * 发送 delete 请求
   */
  delete!: AxiosDomainAsRequestWithParams;

  /**
   * 发送 trace 请求
   */
  trace!: AxiosDomainAsRequest;

  /**
   * 发送 connect 请求
   */
  connect!: AxiosDomainAsRequest;

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

    this.#createAsRequests();
    this.#createAspRequests();
    this.#createAsdRequests();
  }

  #createAsRequests() {
    for (const alias of AxiosDomain.as) {
      this[alias] = function processAsRequest(url, config = {}) {
        config.method = alias;
        return this.request(url, config);
      };
    }
  }

  #createAspRequests() {
    for (const alias of AxiosDomain.asp) {
      this[alias] = function processAspRequest(url, params = {}, config = {}) {
        config.method = alias;
        config.params = deepMerge(params, config.params ?? {});
        return this.request(url, config);
      };
    }
  }

  #createAsdRequests() {
    for (const alias of AxiosDomain.asd) {
      this[alias] = function processAsdRequest(url, data = {}, config = {}) {
        config.method = alias;
        config.data = deepMerge(data, config.data ?? {});
        return this.request(url, config);
      };
    }
  }
}
