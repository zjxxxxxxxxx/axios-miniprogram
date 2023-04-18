import { buildURL } from '../helpers/buildURL';
import { isAbsoluteURL } from '../helpers/isAbsoluteURL';
import { combineURL } from '../helpers/combineURL';
import { isFunction, isPromise, isString } from '../helpers/isTypes';
import {
  AxiosAdapter,
  AxiosAdapterRequestMethod,
  AxiosAdapterPlatformTask,
  AxiosAdapterRequestConfig,
  AxiosAdapterResponseData,
} from '../adapter';
import InterceptorManager, { Interceptor } from './InterceptorManager';
import { mergeConfig } from './mergeConfig';
import { CancelToken } from './cancel';
import { dispatchRequest } from './dispatchRequest';
import { AxiosTransformer } from './transformData';
import AxiosDomain from './AxiosDomain';

/**
 * 请求方法
 */
export type AxiosRequestMethod =
  | AxiosAdapterRequestMethod
  | 'options'
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'trace'
  | 'connect';

/**
 * 请求头
 */
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

/**
 * 表单数据（上传会用到）
 */
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

/**
 * 请求数据
 */
export type AxiosRequestData =
  | string
  | AnyObject
  | ArrayBuffer
  | AxiosRequestFormData;

/**
 * 响应数据
 */
export type AxiosResponseData = undefined | number | AxiosAdapterResponseData;

/**
 * 监听进度回调事件对象
 */
export interface AxiosProgressEvent {
  /**
   * 下载进度
   */
  progress: number;
  /**
   * 已经下载的数据长度
   */
  totalBytesSent: number;
  /**
   * 预期需要下载的数据总长度
   */
  totalBytesExpectedToSend: number;
}

/**
 * 监听进度回调
 */
export interface AxiosProgressCallback {
  (
    /**
     * 事件对象
     */
    event: AxiosProgressEvent,
  ): void;
}

/**
 * 请求配置
 */
export interface AxiosRequestConfig
  extends Partial<
    Omit<AxiosAdapterRequestConfig, 'type' | 'success' | 'fail'>
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
   * 请求的 URL
   */
  url?: string;
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
  transformRequest?: AxiosTransformer<AxiosRequestData>;
  /**
   * 转换响应数据
   */
  transformResponse?: AxiosTransformer<AxiosResponseData>;
  /**
   * 错误处理
   */
  errorHandler?: (error: unknown) => Promise<void> | void;
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

/**
 * 响应体
 */
export interface AxiosResponse<
  TData extends AxiosResponseData = AxiosResponseData,
> extends AnyObject {
  /**
   * 状态码
   */
  status: number;
  /**
   * 状态字符
   */
  statusText: string;
  /**
   * 响应头
   */
  headers: AnyObject;
  /**
   * 响应数据
   */
  data: TData;
  /**
   * 请求配置
   */
  config: AxiosRequestConfig;
  /**
   * 请求任务
   */
  request?: AxiosAdapterPlatformTask;
}

/**
 * 错误体
 */
export interface AxiosResponseError extends AnyObject {
  /**
   * 状态码
   */
  status: number;
  /**
   * 状态字符
   */
  statusText: string;
  /**
   * 响应头
   */
  headers: AnyObject;
  /**
   * 错误数据
   */
  data?: AnyObject;
  /**
   * 失败的请求，指没能够成功响应的请求
   */
  isFail: true;
  /**
   * 请求配置
   */
  config: AxiosRequestConfig;
  /**
   * 请求任务
   */
  request?: AxiosAdapterPlatformTask;
}

/**
 * Axios 构造函数
 */
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
  fork = (defaults: AxiosRequestConfig = {}) => {
    if (isString(defaults.baseURL) && !isAbsoluteURL(defaults.baseURL)) {
      defaults.baseURL = combineURL(this.defaults.baseURL, defaults.baseURL);
    }
    return new AxiosDomain(mergeConfig(this.defaults, defaults), (config) =>
      this.#processRequest(config),
    );
  };

  #processRequest(config: AxiosRequestConfig) {
    const chain: [
      Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse>,
    ] = [
      {
        resolved: dispatchRequest,
      },
    ];

    this.interceptors.request.forEach(chain.unshift.bind(chain));
    this.interceptors.response.forEach(chain.push.bind(chain));

    let next = Promise.resolve(config);
    for (const { resolved, rejected } of chain) {
      next = next.then(
        // @ts-ignore
        resolved,
        rejected,
      );
    }

    // 错误处理
    next = next.catch((reason) => {
      const { errorHandler } = config;

      if (isFunction(errorHandler)) {
        const promise = errorHandler(reason);
        if (isPromise(promise)) {
          return promise.then(() => Promise.reject(reason));
        }
      }

      return Promise.reject(reason);
    });

    return next as Promise<AxiosResponse>;
  }
}
