import { isPlainObject, isString } from '../helpers/isTypes';
import { AxiosRequestConfig, AxiosRequestData, AxiosResponse } from './Axios';
import { mergeConfig } from './mergeConfig';

export interface AxiosDomainAsRequest {
  <TData = unknown>(
    /**
     * 请求配置
     */
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  <TData = unknown>(
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
  <TData = unknown>(
    /**
     * 请求参数
     */
    params?: AnyObject,
    /**
     * 请求配置
     */
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  <TData = unknown>(
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
  <TData = unknown>(
    /**
     * 请求数据
     */
    data?: AnyObject,
    /**
     * 请求配置
     */
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  <TData = unknown>(
    /**
     * 请求地址
     */
    url: string,
    /**
     * 请求数据
     */
    data?: AnyObject,
    /**
     * 请求配置
     */
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
}

export interface AxiosDomainRequest {
  <TData = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<TData>>;
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
    defaults: AxiosRequestConfig = {},
    processRequest: AxiosDomainRequest,
  ) {
    this.defaults = defaults;
    this.request = <TData = unknown>(config: AxiosRequestConfig) => {
      return processRequest<TData>(mergeConfig(this.defaults, config));
    };

    this.#createAsRequests();
    this.#createAspRequests();
    this.#createAsdRequests();
  }

  #createAsRequests() {
    for (const alias of AxiosDomain.as) {
      this[alias] = function processAsRequest(
        urlOrConfig?: string | AxiosRequestConfig,
        config: AxiosRequestConfig = {},
      ) {
        if (isString(urlOrConfig)) {
          config.url = urlOrConfig;
        } else if (isPlainObject(urlOrConfig)) {
          config = urlOrConfig;
        }
        config.method = alias;

        return this.request(config);
      };
    }
  }

  #createAspRequests() {
    for (const alias of AxiosDomain.asp) {
      this[alias] = function processAspRequest(
        urlOrParams?: string | AxiosRequestConfig,
        paramsOrConfig: AxiosRequestConfig | AnyObject = {},
        config: AxiosRequestConfig = {},
      ) {
        if (isString(urlOrParams)) {
          config.url = urlOrParams;
          config.params = paramsOrConfig;
        } else if (isPlainObject(urlOrParams)) {
          config = paramsOrConfig;
          config.params = urlOrParams;
        }
        config.method = alias;

        return this.request(config);
      };
    }
  }

  #createAsdRequests() {
    for (const alias of AxiosDomain.asd) {
      this[alias] = function processAsdRequest(
        urlOrData?: string | AxiosRequestConfig,
        dataOrConfig: AxiosRequestData | AxiosRequestConfig = {},
        config: AxiosRequestConfig = {},
      ) {
        if (isString(urlOrData)) {
          config.url = urlOrData;
          config.data = dataOrConfig;
        } else if (isPlainObject(urlOrData)) {
          config = dataOrConfig;
          config.data = urlOrData;
        }
        config.method = alias;

        return this.request(config);
      };
    }
  }
}
