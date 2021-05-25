import { buildURL } from '../utils';
import { mergeConfig } from './mergeConfig';
import {
  AdapterRequestMethod,
  AxiosAdapter,
  AxiosAdapterTask,
} from './adapter';
import { CancelToken } from './cancel';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './InterceptorManager';
import { AxiosTransformer } from './transformData';

export type AxiosRequestMethodAlias =
  | 'options'
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'trace'
  | 'connect';

export type AxiosRequestMethod = AdapterRequestMethod | AxiosRequestMethodAlias;

export type AxiosRequestHeaders = AnyObject;

export type AxiosRequestParams = AnyObject;

export type AxiosRequestData = AnyObject;

export type AxiosResponseHeaders = AnyObject;

export interface AxiosRequestFormData extends AxiosRequestData {
  fileName: string;
  filePath: string;
  fileType?: 'image' | 'video' | 'audio';
  hideLoading?: boolean;
}

export interface AxiosProgressEvent {
  progress: number;
  totalBytesSent: number;
  totalBytesExpectedToSend: number;
}

export interface AxiosProgressCallback {
  (event: AxiosProgressEvent): void;
}

export interface AxiosRequestConfig {
  adapter?: AxiosAdapter;
  baseURL?: string;
  cancelToken?: CancelToken;
  data?: AxiosRequestData | AxiosRequestFormData | AxiosRequestFormData;
  dataType?: 'json' | '其他';
  enableHttp2?: boolean;
  enableQuic?: boolean;
  enableCache?: boolean;
  errorHandler?: (error: any) => Promise<any>;
  headers?: AxiosRequestHeaders;
  method?: AxiosRequestMethod;
  onUploadProgress?: AxiosProgressCallback;
  onDownloadProgress?: AxiosProgressCallback;
  params?: AxiosRequestParams;
  paramsSerializer?: (params?: AxiosRequestParams) => string;
  responseType?: 'text' | 'arraybuffer';
  sslVerify?: boolean;
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  timeout?: number;
  url?: string;
  validateStatus?: (status: number) => boolean;
}

export interface AxiosResponse<TData = any> {
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  data: TData;
  config?: AxiosRequestConfig;
  request?: AxiosAdapterTask;
  cookies?: string[];
  profile?: AnyObject;
}

export interface AxiosResponseError extends AnyObject {
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
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

  public request<TData = any>(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    const requestConfig = mergeConfig(this.defaults, config);

    let promiseRequest = Promise.resolve(requestConfig);

    this.interceptors.request.forEach(({ resolved, rejected }) => {
      promiseRequest = promiseRequest.then(resolved, rejected);
    }, 'reverse');

    let promiseResponse = promiseRequest.then(dispatchRequest);

    this.interceptors.response.forEach(({ resolved, rejected }) => {
      promiseResponse = promiseResponse.then(resolved, rejected);
    });

    return promiseResponse as Promise<AxiosResponse<TData>>;
  }

  public options<TData = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._requestMethodWithoutParams<TData>(
      'options',
      url,
      undefined,
      config,
    );
  }

  public get<TData = any>(
    url: string,
    params?: AxiosRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._requestMethodWithoutParams<TData>('get', url, params, config);
  }

  public head<TData = any>(
    url: string,
    params?: AxiosRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._requestMethodWithoutParams<TData>('head', url, params, config);
  }

  public post<TData = any>(
    url: string,
    data?: AxiosRequestData | AxiosRequestFormData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._requestMethodWithoutData<TData>('post', url, data, config);
  }

  public put<TData = any>(
    url: string,
    data?: AxiosRequestData | AxiosRequestFormData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._requestMethodWithoutData<TData>('put', url, data, config);
  }

  public delete<TData = any>(
    url: string,
    params?: AxiosRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._requestMethodWithoutParams<TData>(
      'delete',
      url,
      params,
      config,
    );
  }

  public trace<TData = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._requestMethodWithoutParams<TData>(
      'trace',
      url,
      undefined,
      config,
    );
  }

  public connect<TData = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this._requestMethodWithoutParams<TData>(
      'connect',
      url,
      undefined,
      config,
    );
  }

  private _requestMethodWithoutParams<TData = any>(
    method: AxiosRequestMethod,
    url: string,
    params?: AxiosRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    return this.request<TData>({
      ...(config ?? {}),
      method,
      url,
      params,
    });
  }

  private _requestMethodWithoutData<TData = any>(
    method: AxiosRequestMethod,
    url: string,
    data?: AxiosRequestData | AxiosRequestFormData,
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
