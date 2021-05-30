import {
  AxiosProgressCallback,
  AxiosRequestConfig,
  AxiosRequestData,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosResponseError,
} from './Axios';
export declare type AxiosAdapterRequestType = 'request' | 'download' | 'upload';
export declare type AxiosAdapterRequestMethod =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';
export interface AxiosAdapterRequestConfig extends AxiosRequestConfig {
  type: AxiosAdapterRequestType;
  method: AxiosAdapterRequestMethod;
  url: string;
  success(response: AxiosResponse): void;
  fail(error: AxiosResponseError): void;
}
export interface AxiosAdapterBaseOptions extends AxiosAdapterRequestConfig {
  header?: AxiosRequestHeaders;
  success(response: any): void;
  fail(error: any): void;
}
export interface AxiosAdapterUploadOptions extends AxiosAdapterBaseOptions {
  filePath: string;
  name: string;
  fileName: string;
  fileType: 'image' | 'video' | 'audio';
  hideLoading?: boolean;
  formData?: AxiosRequestData;
}
export interface AxiosAdapterDownloadOptions extends AxiosAdapterBaseOptions {
  filePath?: string;
  fileName?: string;
}
export interface AxiosAdapterRequest {
  (config: AxiosAdapterBaseOptions): AxiosAdapterTask | void;
}
export interface AxiosAdapterUpload {
  (config: AxiosAdapterUploadOptions): AxiosAdapterTask | void;
}
export interface AxiosAdapterDownload {
  (config: AxiosAdapterDownloadOptions): AxiosAdapterTask | void;
}
export interface AxiosPlatform {
  request: AxiosAdapterRequest;
  upload: AxiosAdapterUpload;
  download: AxiosAdapterDownload;
}
export interface AxiosAdapterTask {
  abort?(): void;
  onProgressUpdate?(callback: AxiosProgressCallback): void;
  offProgressUpdate?(callback: AxiosProgressCallback): void;
}
export interface AxiosAdapter {
  (config: AxiosAdapterRequestConfig): AxiosAdapterTask | void;
}
export declare function isPlatform(value: any): value is AxiosPlatform;
export declare function revisePlatformApiNames(
  platform: AnyObject,
): AxiosPlatform;
export declare function createAdapter(platform: AxiosPlatform): AxiosAdapter;
export declare function getAdapterDefault(): AxiosAdapter | undefined;
