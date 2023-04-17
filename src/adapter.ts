import {
  isFunction,
  isPlainObject,
  isString,
  isUndefined,
} from './helpers/isTypes';
import { assert } from './helpers/error';
import {
  AxiosProgressCallback,
  AxiosRequestFormData,
  AxiosRequestHeaders,
} from './core/Axios';

export type AxiosAdapterRequestType = 'request' | 'download' | 'upload';

export type AxiosAdapterRequestMethod =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';

export type AxiosAdapterResponseData = string | ArrayBuffer | AnyObject;

export interface AxiosAdapterResponse extends AnyObject {
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
  data: AxiosAdapterResponseData;
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
  /**
   * 错误数据
   */
  data?: AnyObject;
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
  success(response: AxiosAdapterResponse): void;
  fail(error: AxiosAdapterResponseError): void;
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

export type AxiosAdapterTask =
  | undefined
  | void
  | {
      abort?(): void;
      onProgressUpdate?(callback: AxiosProgressCallback): void;
      offProgressUpdate?(callback: AxiosProgressCallback): void;
    };

export interface AxiosAdapter {
  (config: AxiosAdapterRequestConfig): AxiosAdapterTask;
}

export function getAdapterDefault() {
  const platform = revisePlatformApiNames(getPlatform());

  function getPlatform() {
    const undef = 'undefined';

    if (typeof uni !== undef) {
      return {
        request: uni.request,
        uploadFile: uni.uploadFile,
        downloadFile: uni.downloadFile,
      };
    } else if (typeof wx !== undef) {
      return wx;
    } else if (typeof my !== undef) {
      return my;
    } else if (typeof swan !== undef) {
      return swan;
    } else if (typeof tt !== undef) {
      return tt;
    } else if (typeof qq !== undef) {
      return qq;
    } else if (typeof qh !== undef) {
      return qh;
    } else if (typeof ks !== undef) {
      return ks;
    } else if (typeof dd !== undef) {
      return dd;
    } else if (typeof jd !== undef) {
      return jd;
    }
  }

  function revisePlatformApiNames(platform?: AnyObject) {
    return (
      platform && {
        request: platform.request ?? platform.httpRequest,
        upload: platform.upload ?? platform.uploadFile,
        download: platform.download ?? platform.downloadFile,
      }
    );
  }

  if (!isPlatform(platform)) {
    return;
  }

  return createAdapter(platform);
}

export function createAdapter(platform: AxiosPlatform) {
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
    const options: AxiosAdapterDownloadOptions = {
      ...baseOptions,
      filePath: baseOptions.params?.filePath,
      success(response): void {
        injectDownloadData(response);
        baseOptions.success(response);
      },
    };

    return download(options);
  }

  function transformResponse(response: AnyObject): void {
    response.status = response.status ?? response.statusCode;
    response.statusText = 'OK';

    if (isUndefined(response.status)) {
      response.status = 400;
      response.statusText = 'Fail Adapter';
    }

    response.headers = response.headers ?? response.header ?? {};

    if (isUndefined(response.data) && isString(response.errMsg)) {
      response.data = {
        errMsg: response.errMsg,
        errno: response.errno,
      };
    }

    cleanResponse(response, ['statusCode', 'errMsg', 'errno', 'header']);
  }

  function transformOptions(
    config: AxiosAdapterRequestConfig,
  ): AxiosAdapterBaseOptions {
    return {
      ...config,
      header: config.headers,
      success(response): void {
        transformResponse(response);
        config.success(response);
      },
      fail(error: AxiosAdapterResponseError): void {
        transformResponse(error);
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

    cleanResponse(response, ['tempFilePath', 'apFilePath', 'filePath']);
  }

  /**
   * 清理 response 上多余的 key
   */
  function cleanResponse(response: AnyObject, keys: string[]) {
    for (const key of keys) {
      delete response[key];
    }
  }

  return adapter;
}

export function isPlatform(value: any): value is AxiosPlatform {
  return (
    isPlainObject(value) &&
    isFunction(value.request) &&
    isFunction(value.upload) &&
    isFunction(value.download)
  );
}
