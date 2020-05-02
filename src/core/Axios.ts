/*
 * @Author: early-autumn
 * @Date: 2020-04-13 18:00:27
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-25 09:23:14
 */
import { Method, Params, Data, Interceptors, AxiosRequestConfig, AxiosResponse, Axios } from '../types';
import buildURL from '../helpers/buildURL';
import mergeConfig from './mergeConfig';
import InterceptorManager from './InterceptorManager';
import dispatchRequest from './dispatchRequest';

export default class AxiosClass implements Axios {
  /**
   *  Axios 拦截器
   */
  public interceptors: Interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosResponse>(),
  };

  /**
   * @param defaults 自定义默认配置
   */
  public constructor(public defaults: AxiosRequestConfig = {}) {}

  /**
   * 根据配置中的 url 和 params 生成一个 URI
   *
   * @param config Axios 请求配置
   */
  public getUri(config: AxiosRequestConfig): string {
    const { url = '', params, paramsSerializer } = mergeConfig(this.defaults, config);

    return buildURL(url, params, paramsSerializer).replace(/^\?/, '');
  }

  /**
   * 发送 HTTP 请求
   *
   * @param config Axios 请求配置
   */
  public request<T extends Data>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const requestConfig = mergeConfig(this.defaults, config);

    let promiseRequest = Promise.resolve(requestConfig);

    // 执行请求拦截器
    this.interceptors.request.forEach(function executor({ resolved, rejected }) {
      promiseRequest = promiseRequest.then(resolved, rejected);
    }, 'reverse');

    // 发送请求
    let promiseResponse = promiseRequest.then(dispatchRequest) as Promise<AxiosResponse<T>>;

    // 执行响应拦截器
    this.interceptors.response.forEach(function executor({ resolved, rejected }) {
      promiseResponse = promiseResponse.then(resolved, rejected);
    });

    return promiseResponse;
  }

  /**
   * 发送 HTTP OPTIONS 请求
   *
   * @param url    请求地址
   * @param config 额外配置
   */
  public options<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('options', url, undefined, config);
  }

  /**
   * 发送 HTTP GET 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public get<T extends Data>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('get', url, params, config);
  }

  /**
   * 发送 HTTP HEAD 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public head<T extends Data>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('head', url, params, config);
  }

  /**
   * 发送 HTTP POST 请求
   *
   * @param url    请求地址
   * @param data   请求数据
   * @param config 额外配置
   */
  public post<T extends Data>(url: string, data?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutData<T>('post', url, data, config);
  }

  /**
   * 发送 HTTP PUT 请求
   *
   * @param url    请求地址
   * @param data   请求数据
   * @param config 额外配置
   */
  public put<T extends Data>(url: string, data?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutData<T>('put', url, data, config);
  }

  /**
   * 发送 HTTP DELETE 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public delete<T extends Data>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('delete', url, params, config);
  }

  /**
   * 发送 HTTP TRACE 请求
   *
   * @param url    请求地址
   * @param config 额外配置
   */
  public trace<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('trace', url, undefined, config);
  }

  /**
   * 发送 HTTP CONNECT 请求
   *
   * @param url    请求地址
   * @param config 额外配置
   */
  public connect<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('connect', url, undefined, config);
  }

  /**
   * 合并配置后发送 HTTP 请求
   *
   * @param method 请求方法
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  private _requestMethodWithoutParams<T extends Data>(
    method: Method,
    url: string,
    params?: Params,
    config: AxiosRequestConfig = {}
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
  private _requestMethodWithoutData<T extends Data>(
    method: Method,
    url: string,
    data?: Data,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({
      ...config,
      method,
      url,
      data,
    });
  }
}
