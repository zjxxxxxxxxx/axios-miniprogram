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
}

export interface AxiosAdapterResponseError extends AnyObject {
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

export interface AxiosAdapterUploadOptions
  extends AxiosAdapterBaseOptions,
    AxiosRequestFormData {
  fileName: string;
  formData?: AnyObject;
}

export interface AxiosAdapterDownloadOptions extends AxiosAdapterBaseOptions {
  filePath?: string;
}

export interface AxiosAdapterRequest {
  (config: AxiosAdapterBaseOptions): AxiosAdapterTask;
}

export interface AxiosAdapterUpload {
  (config: AxiosAdapterUploadOptions): AxiosAdapterTask;
}

export interface AxiosAdapterDownload {
  (config: AxiosAdapterDownloadOptions): AxiosAdapterTask;
}

export interface AxiosPlatform {
  request: AxiosAdapterRequest;
  upload: AxiosAdapterUpload;
  download: AxiosAdapterDownload;
}

export type AxiosAdapterTask = {
  abort?(): void;
  onProgressUpdate?(callback: AxiosProgressCallback): void;
  offProgressUpdate?(callback: AxiosProgressCallback): void;
} | void;

export interface AxiosAdapter {
  (config: AxiosAdapterRequestConfig): AxiosAdapterTask;
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

  function adapter(config: AxiosAdapterRequestConfig): AxiosAdapterTask {
    const baseOptions = transformOptions(config);

    switch (config.type) {
      case 'request':
        return processRequest(platform.request, baseOptions);
      case 'upload':
        return processUpload(platform.upload, baseOptions);
      case 'download':
        return processDownload(platform.download, baseOptions);
      default:
        throwError(`无法识别的请求类型 ${config.type}`);
    }
  }

  function processRequest(
    request: AxiosAdapterRequest,
    baseOptions: AxiosAdapterBaseOptions,
  ): AxiosAdapterTask {
    return request(baseOptions);
  }

  function processUpload(
    upload: AxiosAdapterUpload,
    baseOptions: AxiosAdapterBaseOptions,
  ): AxiosAdapterTask {
    const { name, filePath, fileType, ...formData } =
      baseOptions.data as AxiosRequestFormData;
    const options = {
      ...baseOptions,
      name,
      /**
       * [钉钉小程序用 fileName 代替 name](https://open.dingtalk.com/document/orgapp/dd-upload-objects#title-ngk-rr1-eow)
       */
      fileName: name,
      filePath,
      /**
       * 钉钉小程序|支付宝小程序特有参数
       */
      fileType,
      formData,
    };

    return upload(options);
  }

  function processDownload(
    download: AxiosAdapterDownload,
    baseOptions: AxiosAdapterBaseOptions,
  ): AxiosAdapterTask {
    const options = {
      ...baseOptions,
      filePath: baseOptions.params?.filePath,
      success(response: AnyObject): void {
        injectDownloadData(response);
        baseOptions.success(response);
      },
    };

    return download(options);
  }

  function transformResult(result: AnyObject): void {
    result.status =
      result.status ?? result.statusCode ?? isUndefined(result.data)
        ? 400
        : 200;
    result.statusText =
      result.status === 200
        ? 'OK'
        : result.status === 400
        ? 'Bad Adapter'
        : result.errMsg;
    result.headers = result.headers || result.header;

    if (result.statusCode) delete result.statusCode;
    if (result.errMsg) delete result.errMsg;
    if (result.header) delete result.header;
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
    response.data = {
      filePath: response.filePath,
      tempFilePath:
        response.tempFilePath ||
        // response.apFilePath 为支付宝小程序基础库小于 2.7.23 的特有属性。
        response.apFilePath,
    };

    if (response.tempFilePath) delete response.tempFilePath;
    if (response.apFilePath) delete response.apFilePath;
    if (response.filePath) delete response.filePath;
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
