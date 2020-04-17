/*
 * @Author: early-autumn
 * @Date: 2020-04-13 18:00:27
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 19:14:14
 */
import { AxiosMethod, Params, Data, Interceptors, AxiosRequestConfig, AxiosResponse, Axios } from '../types';
import transformURL from '../helper/transformURL';
import mergeConfig from '../helper/mergeConfig';
import InterceptorManager from './InterceptorManager';
import dispatchRequest from './dispatchRequest';

interface PromiseCatch {
  request: Promise<AxiosRequestConfig>;
  response?: Promise<AxiosResponse>;
}

export default class AxiosStatic implements Axios {
  /**
   * 默认配置
   */
  defaults: AxiosRequestConfig;

  /**
   *  Axios 拦截器
   */
  public interceptors: Interceptors;

  constructor(config: AxiosRequestConfig) {
    this.defaults = config;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>(),
    };
  }

  /**
   * baseURL + url + params 得到完整请求地址
   *
   * @param config 请求配置
   */
  public getUri(config: AxiosRequestConfig): string {
    return transformURL(mergeConfig(this.defaults, config));
  }

  /**
   * 发送 HTTP 请求
   *
   * @param config 请求配置
   */
  public request<T extends Data>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    config = mergeConfig(this.defaults, config);

    const promise: PromiseCatch = {
      request: Promise.resolve(config),
    };

    // 执行前置拦截器
    this.interceptors.request.forEach(function executor({ resolved, rejected }) {
      promise.request = promise.request.then(resolved, rejected);
    }, 'reverse');

    // 发送请求
    promise.response = promise.request.then(dispatchRequest, (err: any) => Promise.reject(err));

    // 执行后置拦截器
    this.interceptors.response.forEach(function executor({ resolved, rejected }) {
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
  public options<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutData<T>('options', url, undefined, config);
  }

  /**
   * 发送 HTTP TRACE 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public trace<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutData<T>('options', url, undefined, config);
  }

  /**
   * 发送 HTTP CONNECT 请求
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  public connect<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutData<T>('options', url, undefined, config);
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
   * 合并配置后发送 HTTP 请求
   *
   * @param method 请求方法
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  private _requestMethodWithoutParams<T extends Data>(
    method: AxiosMethod,
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
    method: AxiosMethod,
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
