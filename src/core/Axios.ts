import {
  Method,
  Params,
  Data,
  Interceptors,
  AxiosRequestConfig,
  AxiosResponse,
  Axios,
} from '../types';
import buildURL from '../helpers/buildURL';
import mergeConfig from './mergeConfig';
import InterceptorManager from './InterceptorManager';
import dispatchRequest from './dispatchRequest';

export default class AxiosClass implements Axios {
  public interceptors: Interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosResponse>(),
  };

  /**
   * @param defaults 自定义默认配置
   */
  public constructor(public defaults: AxiosRequestConfig = {}) {}

  public getUri(config: AxiosRequestConfig): string {
    const { url = '', params, paramsSerializer } = mergeConfig(this.defaults, config);

    return buildURL(url, params, paramsSerializer).replace(/^\?/, '');
  }

  public request<T extends Data>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const requestConfig = mergeConfig(this.defaults, config);

    let promiseRequest = Promise.resolve(requestConfig);

    // 执行请求拦截器
    this.interceptors.request.forEach(function executor({ resolved, rejected }) {
      promiseRequest = promiseRequest.then(resolved, rejected);
    }, 'reverse');

    // 发送请求
    let promiseResponse = promiseRequest.then(dispatchRequest);

    // 执行响应拦截器
    this.interceptors.response.forEach(function executor({ resolved, rejected }) {
      promiseResponse = promiseResponse.then(resolved, rejected);
    });

    return promiseResponse as Promise<AxiosResponse<T>>;
  }

  public options<T extends Data>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('options', url, void 0, config);
  }

  public get<T extends Data>(
    url: string,
    params?: Params,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('get', url, params, config);
  }

  public head<T extends Data>(
    url: string,
    params?: Params,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('head', url, params, config);
  }

  public post<T extends Data>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutData<T>('post', url, data, config);
  }

  public put<T extends Data>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutData<T>('put', url, data, config);
  }

  public delete<T extends Data>(
    url: string,
    params?: Params,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('delete', url, params, config);
  }

  public trace<T extends Data>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('trace', url, void 0, config);
  }

  public connect<T extends Data>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._requestMethodWithoutParams<T>('connect', url, void 0, config);
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
