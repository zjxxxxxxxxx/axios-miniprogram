import {
  isEmptyArray,
  isFunction,
  isPlainObject,
  isUndefined,
} from './helpers/isTypes';
import { assert, throwError } from './helpers/error';
import {
  AxiosProgressCallback,
  AxiosRequestFormData,
  AxiosRequestHeaders,
  AxiosResponse,
} from './core/Axios';

export type AxiosAdapterRequestType = 'request' | 'download' | 'upload';

export type AxiosAdapterRequestMethod =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';

export interface AxiosAdapterResponse<TData = unknown> extends AnyObject {
  status: number;
  statusText: string;
  headers: AnyObject;
  data: TData;
}

export interface AxiosAdapterResponseError extends AnyObject {
  status: number;
  statusText: string;
  headers: AnyObject;
}

export interface AxiosAdapterRequestConfig extends AnyObject {
  /**
   * 请求类型
   */
  type: 'request' | 'upload' | 'download';
  /**
   * 开发者服务器接口地址
   */
  url: string;
  /**
   * HTTP 请求方法
   */
  method: AxiosAdapterRequestMethod;
  /**
   * 请求参数
   */
  params?: AnyObject;
  /**
   * 请求数据
   */
  data?: AnyObject;
  /**
   * 请求头
   */
  headers?: AnyObject;
  /**
   * 返回的数据格式
   */
  dataType?: 'json' | '其他';
  /**
   * 响应的数据类型
   */
  responseType?: 'text' | 'arraybuffer';
  /**
   * 超时时间，单位为毫秒。默认值为 60000
   */
  timeout?: number;
  /**
   * 成功的回调
   */
  success(response: AxiosAdapterResponse): void;
  /**
   * 失败的回调
   */
  fail(error: AxiosAdapterResponseError): void;
}

export interface AxiosAdapterBaseOptions extends AxiosAdapterRequestConfig {
  header?: AxiosRequestHeaders;
  success(response: unknown): void;
  fail(error: unknown): void;
}

export interface AxiosAdapterUploadOptions extends AxiosAdapterBaseOptions {
  filePath: string;
  name: string;
  fileName: string;
  fileType: 'image' | 'video' | 'audio';
  formData?: AnyObject;
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

export function getAdapterDefault(): AxiosAdapter | undefined {
  const tryGetPlatforms = [
    () => uni,
    () => wx,
    () => my,
    () => swan,
    () => tt,
    () => qq,
    () => qh,
    () => ks,
    () => dd,
    () => jd,
  ];

  let platform;
  while (!isEmptyArray(tryGetPlatforms) && !isPlatform(platform)) {
    try {
      const tryGetPlatform = tryGetPlatforms.shift();

      if (isPlainObject((platform = tryGetPlatform!()))) {
        platform = revisePlatformApiNames(platform);
      }
    } catch (err) {
      // 避免出现异常导致程序被终止
    }
  }

  if (!isPlatform(platform)) {
    return;
  }

  return createAdapter(platform);
}

export function createAdapter(platform: AxiosPlatform): AxiosAdapter {
  assert(isPlainObject(platform), 'platform 不是一个 object');
  assert(isFunction(platform.request), 'request 不是一个 function');
  assert(isFunction(platform.upload), 'upload 不是一个 function');
  assert(isFunction(platform.download), 'download 不是一个 function');

  function adapter(config: AxiosAdapterRequestConfig): AxiosAdapterTask | void {
    const baseOptions = transformOptions(config);

    switch (config.type) {
      case 'request':
        return callRequest(platform.request, baseOptions);
      case 'upload':
        return callUpload(platform.upload, baseOptions);
      case 'download':
        return callDownload(platform.download, baseOptions);
      default:
        throwError(`无法识别的请求类型 ${config.type}`);
    }
  }

  function callRequest(
    request: AxiosAdapterRequest,
    baseOptions: AxiosAdapterBaseOptions,
  ): AxiosAdapterTask | void {
    return request(baseOptions);
  }

  function callUpload(
    upload: AxiosAdapterUpload,
    baseOptions: AxiosAdapterBaseOptions,
  ): AxiosAdapterTask | void {
    const { fileName, filePath, fileType, ...formData } =
      baseOptions.data as AxiosRequestFormData;
    const options = {
      ...baseOptions,
      name: fileName,
      fileName: fileName,
      filePath,
      fileType: fileType ?? 'image',
      formData,
    };

    return upload(options);
  }

  function callDownload(
    download: AxiosAdapterDownload,
    baseOptions: AxiosAdapterBaseOptions,
  ): AxiosAdapterTask | void {
    const options = {
      ...baseOptions,
      filePath: baseOptions.params?.filePath,
      fileName: baseOptions.params?.fileName,
      success(response: AnyObject): void {
        injectDownloadData(response);
        baseOptions.success(response);
      },
    };

    return download(options);
  }

  function transformResult(result: AnyObject): void {
    result.status = result.status || isUndefined(result.data) ? 400 : 200;
    if (result.statusCode) {
      result.status = result.statusCode;
      delete result.statusCode;
    }

    if (isUndefined(result.statusText)) {
      result.statusText =
        result.status === 200
          ? 'OK'
          : result.status === 400
          ? 'Bad Adapter'
          : '';
    }

    result.headers = result.headers || {};
    if (result.header) {
      result.headers = result.header;
      delete result.header;
    }

    if (result.errMsg) {
      result.statusText = result.errMsg;
      delete result.errMsg;
    }
  }

  function transformOptions(
    config: AxiosAdapterRequestConfig,
  ): AxiosAdapterBaseOptions {
    return {
      ...config,
      header: config.headers,
      success(response: AxiosResponse<unknown>): void {
        transformResult(response);
        config.success(response);
      },
      fail(error: AxiosAdapterResponseError): void {
        transformResult(error);
        config.fail(error);
      },
    };
  }

  function injectDownloadData(response: AnyObject): void {
    response.data = response.data || {};

    if (response.tempFilePath) {
      response.data.tempFilePath = response.tempFilePath;
      delete response.tempFilePath;
    }

    if (response.apFilePath) {
      response.data.tempFilePath = response.apFilePath;
      delete response.apFilePath;
    }

    if (response.filePath) {
      response.data.filePath = response.filePath;
      delete response.filePath;
    }
  }

  return adapter;
}

export function isPlatform(value: unknown): value is AxiosPlatform {
  return (
    isPlainObject(value) &&
    isFunction(value.request) &&
    isFunction(value.upload) &&
    isFunction(value.download)
  );
}

export function revisePlatformApiNames(platform: AnyObject): AxiosPlatform {
  return {
    request: platform.request ?? platform.httpRequest,
    upload: platform.upload ?? platform.uploadFile,
    download: platform.download ?? platform.downloadFile,
  };
}
