import {
  AxiosAdapterRequestMethod,
  AxiosAdapter,
  AxiosAdapterTask,
} from './adapter';
import { CancelToken } from './cancel';
import InterceptorManager from './InterceptorManager';
import { AxiosTransformer } from './transformData';
export declare type AxiosRequestMethodAlias =
  | 'options'
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'trace'
  | 'connect';
export declare type AxiosRequestMethod =
  | AxiosAdapterRequestMethod
  | AxiosRequestMethodAlias;
export declare type AxiosRequestHeaders = AnyObject;
export declare type AxiosRequestParams = AnyObject;
export declare type AxiosRequestData = AnyObject;
export declare type AxiosResponseHeaders = AnyObject;
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
  download?: boolean;
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
  upload?: boolean;
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
  defaults: AxiosRequestConfig;
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse<any>>;
  };
  constructor(defaults?: AxiosRequestConfig);
  getUri(config: AxiosRequestConfig): string;
  request<TData = any>(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  options<TData = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  get<TData = any>(
    url: string,
    params?: AxiosRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  head<TData = any>(
    url: string,
    params?: AxiosRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  post<TData = any>(
    url: string,
    data?: AxiosRequestData | AxiosRequestFormData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  put<TData = any>(
    url: string,
    data?: AxiosRequestData | AxiosRequestFormData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  delete<TData = any>(
    url: string,
    params?: AxiosRequestParams,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  trace<TData = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  connect<TData = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  private _requestMethodWithoutParams;
  private _requestMethodWithoutData;
}
