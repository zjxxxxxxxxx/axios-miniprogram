import { buildURL } from '../helpers/buildURL';
import { isAbsoluteURL } from '../helpers/isAbsoluteURL';
import { combineURL } from '../helpers/combineURL';
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
import AxiosDomain from './AxiosDomain';

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
   * 异常处理
   */
  errorHandler?: (error: unknown) => Promise<AxiosResponse>;
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

export default class Axios extends AxiosDomain {
  /**
   * 拦截器
   */
  interceptors = {
    /**
     * 请求拦截器
     */
    request: new InterceptorManager<AxiosRequestConfig>(),
    /**
     * 响应拦截器
     */
    response: new InterceptorManager<AxiosResponse>(),
  };

  constructor(defaults: AxiosRequestConfig = {}) {
    super(defaults, (config) => this.#processRequest(config));
  }

  getUri(config: AxiosRequestConfig): string {
    const { url, params, paramsSerializer } = mergeConfig(
      this.defaults,
      config,
    );
    return buildURL(url, params, paramsSerializer).replace(/^\?/, '');
  }

  /**
   * 派生领域
   */
  fork(defaults: AxiosRequestConfig) {
    const { baseURL = '' } = defaults;
    if (!isAbsoluteURL(baseURL)) {
      defaults.baseURL = combineURL(this.defaults.baseURL ?? '', baseURL);
    }
    return new AxiosDomain(
      mergeConfig(this.defaults, defaults),

      (config) => this.#processRequest(config),
    );
  }

  #processRequest<TData = unknown>(config: AxiosRequestConfig) {
    const { request, response } = this.interceptors;

    let promiseRequest = Promise.resolve(config);
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
