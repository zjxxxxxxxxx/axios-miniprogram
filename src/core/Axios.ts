import { buildURL } from '../helpers/url';
import { mergeConfig } from './mergeConfig';
import {
  AxiosAdapter,
  AxiosAdapterRequestMethod,
  AxiosAdapterTask,
  AxiosAdapterResponse,
  AxiosAdapterResponseError,
  AxiosAdapterRequestConfig,
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
  options?: AnyObject;
  get?: AnyObject;
  head?: AnyObject;
  post?: AnyObject;
  put?: AnyObject;
  delete?: AnyObject;
  trace?: AnyObject;
  connect?: AnyObject;
}

export interface AxiosRequestFormData extends AnyObject {
  fileName: string;
  filePath: string;
  fileType?: 'image' | 'video' | 'audio';
}

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
  data?: AnyObject | AxiosRequestFormData;
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
  config?: AxiosRequestConfig;
  request?: AxiosAdapterTask;
}

export interface AxiosResponseError extends AxiosAdapterResponseError {
  config?: AxiosRequestConfig;
  request?: AxiosAdapterTask;
}

export interface AxiosConstructor {
  new (config: AxiosRequestConfig): Axios;
}

export default class Axios {
  public defaults: AxiosRequestConfig;

  public interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosResponse>(),
  };

  public constructor(defaults: AxiosRequestConfig = {}) {
    this.defaults = defaults;
  }

  public getUri(config: AxiosRequestConfig): string {
    const { url, params, paramsSerializer } = mergeConfig(
      this.defaults,
      config,
    );

    return buildURL(url, params, paramsSerializer).replace(/^\?/, '');
  }

  public request<TData = unknown>(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    const requestConfig = mergeConfig(this.defaults, config);

    let promiseRequest = Promise.resolve(requestConfig);

    this.interceptors.request.forEach(({ resolved, rejected }) => {
      promiseRequest = promiseRequest.then(
        resolved,
        rejected,
      ) as Promise<AxiosRequestConfig>;
    }, 'reverse');

    let promiseResponse = promiseRequest.then(dispatchRequest);

    this.interceptors.response.forEach(({ resolved, rejected }) => {
      promiseResponse = promiseResponse.then(resolved, rejected) as Promise<
        AxiosResponse<unknown>
      >;
    });

    return promiseResponse as Promise<AxiosResponse<TData>>;
  }

  public options<TData = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._req<TData>('options', url, undefined, config);
  }

  public get<TData = unknown>(
    url: string,
    params?: AnyObject,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._req<TData>('get', url, params, config);
  }

  public head<TData = unknown>(
    url: string,
    params?: AnyObject,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._req<TData>('head', url, params, config);
  }

  public post<TData = unknown>(
    url: string,
    data?: AnyObject | AxiosRequestFormData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._reqWithData<TData>('post', url, data, config);
  }

  public put<TData = unknown>(
    url: string,
    data?: AnyObject | AxiosRequestFormData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._reqWithData<TData>('put', url, data, config);
  }

  public delete<TData = unknown>(
    url: string,
    params?: AnyObject,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._req<TData>('delete', url, params, config);
  }

  public trace<TData = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._req<TData>('trace', url, undefined, config);
  }

  public connect<TData = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._req<TData>('connect', url, undefined, config);
  }

  private _req<TData = unknown>(
    method: AxiosRequestMethod,
    url: string,
    params?: AnyObject,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this.request<TData>({
      ...(config ?? {}),
      method,
      url,
      params,
    });
  }

  private _reqWithData<TData = unknown>(
    method: AxiosRequestMethod,
    url: string,
    data?: AnyObject | AxiosRequestFormData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this.request<TData>({
      ...(config ?? {}),
      method,
      url,
      data,
    });
  }
}
