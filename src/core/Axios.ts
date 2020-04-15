/*
 * @Author: early-autumn
 * @Date: 2020-04-13 18:00:27
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-16 00:11:53
 */
import {
  Method,
  Params,
  Data,
  Interceptors,
  AxiosRequest,
  AxiosRequestDefault,
  AxiosMethodConfig,
  ResponseData,
  AxiosResponse,
  Axios,
} from '../types';
import InterceptorManager from './InterceptorManager';
import mergeConfig from './mergeConfig';
import dispatchRequest from './dispatchRequest';

interface PromiseCatch {
  request: Promise<AxiosRequest>;
  response?: Promise<AxiosResponse>;
}

export default class AxiosStatic implements Axios {
  /**
   * 默认配置
   */
  defaults: AxiosRequestDefault;

  /**
   *  Axios 拦截器
   */
  public interceptors: Interceptors;

  constructor(config: AxiosRequestDefault) {
    this.defaults = config;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequest>(),
      response: new InterceptorManager<AxiosResponse>(),
    };
  }

  /**
   * 发送 HTTP 请求
   *
   * @param config 请求配置
   */
  public request<T extends ResponseData>(config: AxiosRequest): Promise<AxiosResponse<T>> {
    config = mergeConfig(this.defaults, config);

    const promise: PromiseCatch = {
      request: Promise.resolve(config),
    };

    // 执行前置拦截器
    this.interceptors.request.forEach(({ resolved, rejected }) => {
      promise.request = promise.request.then(resolved, rejected);
    }, 'reverse');

    // 发送请求
    promise.response = promise.request.then(dispatchRequest, (err: any) => {
      throw err;
    });

    // 执行后置拦截器
    this.interceptors.response.forEach(({ resolved, rejected }) => {
      promise.response = promise.response?.then(resolved, rejected);
    });

    return promise.response as Promise<AxiosResponse<T>>;
  }

  /**
   * 发送 HTTP OPTIONS 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public options<T extends ResponseData>(
    url: string,
    params?: Params,
    config?: AxiosMethodConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('options', url, params, config);
  }

  /**
   * 发送 HTTP GET 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public get<T extends ResponseData>(
    url: string,
    params?: Params,
    config?: AxiosMethodConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('get', url, params, config);
  }

  /**
   * 发送 HTTP HEAD 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public head<T extends ResponseData>(
    url: string,
    params?: Params,
    config?: AxiosMethodConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('head', url, params, config);
  }

  /**
   * 发送 HTTP POST 请求
   *
   * @param url    请求地址
   * @param data   请求数据
   * @param config 额外配置
   */
  public post<T extends ResponseData>(url: string, data?: Data, config?: AxiosMethodConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutData<T>('post', url, data, config);
  }

  /**
   * 发送 HTTP PUT 请求
   *
   * @param url    请求地址
   * @param data   请求数据
   * @param config 额外配置
   */
  public put<T extends ResponseData>(url: string, data?: Data, config?: AxiosMethodConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutData<T>('put', url, data, config);
  }

  /**
   * 发送 HTTP DELETE 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public delete<T extends ResponseData>(
    url: string,
    params?: Params,
    config?: AxiosMethodConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('delete', url, params, config);
  }

  /**
   * 发送 HTTP TRACE 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public trace<T extends ResponseData>(
    url: string,
    params?: Params,
    config?: AxiosMethodConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('trace', url, params, config);
  }

  /**
   * 发送 HTTP CONNECT 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public connect<T extends ResponseData>(
    url: string,
    params?: Params,
    config?: AxiosMethodConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('connect', url, params, config);
  }

  /**
   * 合并配置后发送 HTTP 请求
   *
   * @param method 请求方法
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  private _requestMethodWithoutParams<T extends ResponseData>(
    method: Method,
    url: string,
    params?: Params,
    config: AxiosMethodConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({
      ...config,
      method,
      url,
      params,
    });
  }

  /**
   * 合并配置后发送 HTTP 请求
   *
   * @param method 请求方法
   * @param url    请求地址
   * @param data   请求数据
   * @param config 额外配置
   */
  private _requestMethodWithoutData<T extends ResponseData>(
    method: Method,
    url: string,
    data?: Data,
    config: AxiosMethodConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({
      ...config,
      method,
      url,
      data,
    });
  }
}
