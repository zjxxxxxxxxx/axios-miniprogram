import { buildURL } from '../helpers/buildURL';
import { mergeConfig } from './mergeConfig';
import {
  AxiosAdapter,
  AxiosAdapterRequestMethod,
  AxiosAdapterTask,
  AxiosAdapterResponse,
  AxiosAdapterRequestConfig,
  AxiosAdapterResponseError,
} from '../adapter';
import { CancelToken } from './cancel';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './InterceptorManager';
import { AxiosTransformer } from './transformData';

export type AxiosRequestMethod =
  | AxiosAdapterRequestMethod
  | 'options'
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'trace'
  | 'connect';

export interface AxiosRequestHeaders extends AnyObject {
  /**
   * 通用请求头
   */
  common?: AnyObject;
  /**
   * options 请求头
   */
  options?: AnyObject;
  /**
   * get 请求头
   */
  get?: AnyObject;
  /**
   * head 请求头
   */
  head?: AnyObject;
  /**
   * post 请求头
   */
  post?: AnyObject;
  /**
   * put 请求头
   */
  put?: AnyObject;
  /**
   * delete 请求头
   */
  delete?: AnyObject;
  /**
   * trace 请求头
   */
  trace?: AnyObject;
  /**
   * connect 请求头
   */
  connect?: AnyObject;
}

export interface AxiosRequestFormData extends AnyObject {
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件路径
   */
  filePath: string;
}

export type AxiosRequestData = AnyObject | AxiosRequestFormData;

export interface AxiosProgressEvent {
  progress: number;
  totalBytesSent: number;
  totalBytesExpectedToSend: number;
}

export interface AxiosProgressCallback {
  (event: AxiosProgressEvent): void;
}

export interface AxiosRequestConfig
  extends Omit<
    Partial<AxiosAdapterRequestConfig>,
    'type' | 'method' | 'success' | 'fail'
  > {
  /**
   * 请求适配器
   */
  adapter?: AxiosAdapter;
  /**
   * 基础路径
   */
  baseURL?: string;
  /**
   * 请求参数
   */
  params?: AnyObject;
  /**
   * 请求数据
   */
  data?: AxiosRequestData;
  /**
   * 请求头
   */
  headers?: AxiosRequestHeaders;
  /**
   * 请求方法
   */
  method?: AxiosRequestMethod;
  /**
   * 取消令牌
   */
  cancelToken?: CancelToken;
  /**
   * 上传
   */
  upload?: boolean;
  /**
   * 下载
   */
  download?: boolean;
  /**
   * 转换请求数据
   */
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  /**
   * 转换响应数据
   */
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  /**
   * 异常梳处理
   */
  errorHandler?: (error: unknown) => Promise<unknown>;
  /**
   * 监听上传进度
   */
  onUploadProgress?: AxiosProgressCallback;
  /**
   * 监听下载进度
   */
  onDownloadProgress?: AxiosProgressCallback;
  /**
   * 请求参数系列化函数
   */
  paramsSerializer?: (params?: AnyObject) => string;
  /**
   * 校验状态码
   */
  validateStatus?: (status: number) => boolean;
}

export interface AxiosResponse<TData = unknown>
  extends AxiosAdapterResponse<TData> {
  /**
   * 请求配置
   */
  config?: AxiosRequestConfig;
  /**
   * 请求任务
   */
  request?: AxiosAdapterTask;
}

export interface AxiosResponseError extends AxiosAdapterResponseError {
  /**
   * 原生接口 fail 回调产生的响应错误
   */
  isFail: true;
  /**
   * 请求配置
   */
  config?: AxiosRequestConfig;
  /**
   * 请求任务
   */
  request?: AxiosAdapterTask;
}

export interface AxiosConstructor {
  new (config: AxiosRequestConfig): Axios;
}

export interface AxiosAliasMethod {
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

export interface AxiosWithParamsAliasMethod {
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

export interface AxiosWithDataAliasMethod {
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

export default class Axios {
  /**
   * 普通请求别名
   */
  public static as = ['options', 'trace', 'connect'] as const;
  /**
   * 带请求参数的请求别名
   */
  public static pas = ['head', 'get', 'delete'] as const;
  /**
   * 带请求数据的请求别名
   */
  public static das = ['post', 'put'] as const;

  /**
   * 默认请求配置
   */
  public defaults: AxiosRequestConfig;

  /**
   * 拦截器
   */
  public interceptors = {
    /**
     * 请求拦截器
     */
    request: new InterceptorManager<AxiosRequestConfig>(),
    /**
     * 响应拦截器
     */
    response: new InterceptorManager<AxiosResponse>(),
  };

  /**
   * 发送 options 请求
   */
  public options!: AxiosAliasMethod;

  /**
   * 发送 get 请求
   */
  public get!: AxiosWithParamsAliasMethod;

  /**
   * 发送 head 请求
   */
  public head!: AxiosWithParamsAliasMethod;

  /**
   * 发送 post 请求
   */
  public post!: AxiosWithDataAliasMethod;

  /**
   * 发送 put 请求
   */
  public put!: AxiosWithDataAliasMethod;

  /**
   * 发送 delete 请求
   */
  public delete!: AxiosWithParamsAliasMethod;

  /**
   * 发送 trace 请求
   */
  public trace!: AxiosAliasMethod;

  /**
   * 发送 connect 请求
   */
  public connect!: AxiosAliasMethod;

  /**
   * 实例化
   *
   * @param defaults 默认配置
   */
  public constructor(defaults: AxiosRequestConfig = {}) {
    this.defaults = defaults;

    for (const alias of Axios.as) {
      this[alias] = (url, config = {}) => {
        return this.request({
          ...config,
          method: alias,
          url,
        });
      };
    }

    for (const alias of Axios.pas) {
      this[alias] = (url, params, config = {}) => {
        return this.request({
          ...config,
          method: alias,
          params,
          url,
        });
      };
    }

    for (const alias of Axios.das) {
      this[alias] = (url, data, config = {}) => {
        return this.request({
          ...config,
          method: alias,
          data,
          url,
        });
      };
    }
  }

  public getUri(config: AxiosRequestConfig): string {
    const { url, params, paramsSerializer } = mergeConfig(
      this.defaults,
      config,
    );

    return buildURL(url, params, paramsSerializer).replace(/^\?/, '');
  }

  /**
   * 发送请求
   *
   * @param config 请求配置
   */
  public request<TData = unknown>(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    const requestConfig = mergeConfig(this.defaults, config);
    const { request, response } = this.interceptors;

    let promiseRequest = Promise.resolve(requestConfig);
    request.forEach(({ resolved, rejected }) => {
      promiseRequest = promiseRequest.then(
        resolved,
        rejected,
      ) as Promise<AxiosRequestConfig>;
    }, true);
    let promiseResponse = promiseRequest.then(dispatchRequest);
    response.forEach(({ resolved, rejected }) => {
      promiseResponse = promiseResponse.then(resolved, rejected) as Promise<
        AxiosResponse<unknown>
      >;
    });

    return promiseResponse as Promise<AxiosResponse<TData>>;
  }
}
