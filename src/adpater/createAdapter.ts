import { isFunction, isPlainObject } from '../helpers/types';
import { assert } from '../helpers/error';
import { origIgnore } from '../helpers/ignore';
import {
  AxiosProgressEvent,
  AxiosRequestFormData,
  AxiosRequestHeaders,
} from '../core/Axios';

/**
 * 适配器请求类型
 */
export type AxiosAdapterRequestType = 'request' | 'download' | 'upload';

/**
 * 适配器请求方法
 */
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

/**
 * 适配器请求数据
 */
export type AxiosAdapterRequestData = string | AnyObject | ArrayBuffer;

/**
 * 适配器响应数据
 */
export type AxiosAdapterResponseData = string | ArrayBuffer | AnyObject;

/**
 * 适配器响应体
 */
export interface AxiosAdapterResponse extends AnyObject {
  /**
   * 状态码
   */
  status?: number;
  /**
   * 状态字符
   */
  statusText?: string;
  /**
   * 响应头
   */
  headers?: AnyObject;
  /**
   * 响应数据
   */
  data: AxiosAdapterResponseData;
}

/**
 * 适配器错误体
 */
export interface AxiosAdapterResponseError extends AnyObject {
  /**
   * 状态码
   */
  status?: number;
  /**
   * 状态字符
   */
  statusText?: string;
  /**
   * 响应头
   */
  headers?: AnyObject;
  /**
   * 错误数据
   */
  data?: AnyObject;
}

/**
 * 适配器请求配置
 */
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
  data?: AxiosAdapterRequestData;
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

/**
 * 请求函数基本选项
 */
export interface AxiosAdapterBaseOptions extends AxiosAdapterRequestConfig {
  /**
   * 请求头，同 headers
   */
  header?: AxiosRequestHeaders;
  /**
   * 成功的回调
   */
  success(response: AnyObject): void;
  /**
   * 失败的回调
   */
  fail(error: AnyObject): void;
}

/**
 * 请求函数选项
 */
export type AxiosAdapterRequestOptions = AxiosAdapterBaseOptions;

/**
 * 下载函数选项
 */
export interface AxiosAdapterDownloadOptions extends AxiosAdapterBaseOptions {
  /**
   * 文件下载后存储的路径
   */
  filePath?: string;
}

/**
 * 上传函数选项
 */
export interface AxiosAdapterUploadOptions
  extends AxiosAdapterBaseOptions,
    AxiosRequestFormData {
  /**
   * [钉钉小程序用 fileName 代替 name](https://open.dingtalk.com/document/orgapp/dd-upload-objects#title-ngk-rr1-eow)
   */
  fileName: string;
  /**
   * 钉钉小程序|支付宝小程序特有参数
   */
  fileType?: 'image' | 'video' | 'audie';
  /**
   * 额外的数据
   */
  formData?: AnyObject;
}

/**
 * 请求函数
 */
export interface AxiosAdapterRequest {
  (config: AxiosAdapterRequestOptions): AxiosAdapterPlatformTask;
}

/**
 * 下载函数
 */
export interface AxiosAdapterDownload {
  (config: AxiosAdapterDownloadOptions): AxiosAdapterPlatformTask;
}

/**
 * 上传函数
 */
export interface AxiosAdapterUpload {
  (config: AxiosAdapterUploadOptions): AxiosAdapterPlatformTask;
}

/**
 * 适配器平台
 */
export interface AxiosAdapterPlatform {
  /**
   * 发送请求
   */
  request: AxiosAdapterRequest;
  /**
   * 下载文件
   */
  download: AxiosAdapterDownload;
  /**
   * 上传文件
   */
  upload: AxiosAdapterUpload;
}

/**
 * 适配器平台请求任务
 */
export type AxiosAdapterPlatformTask =
  | undefined
  | void
  | {
      abort?(): void;
      onProgressUpdate?(callback: (event: AxiosProgressEvent) => void): void;
      offProgressUpdate?(callback: (event: AxiosProgressEvent) => void): void;
    };

/**
 * 适配器函数
 */
export interface AxiosAdapter {
  (config: AxiosAdapterRequestConfig): AxiosAdapterPlatformTask;
}

/**
 * 创建适配器
 *
 * @param platform 平台 API 对象
 */
export function createAdapter(platform: AxiosAdapterPlatform) {
  assert(isPlainObject(platform), 'platform 不是一个 object');
  assert(isFunction(platform.request), 'request 不是一个 function');
  assert(isFunction(platform.upload), 'upload 不是一个 function');
  assert(isFunction(platform.download), 'download 不是一个 function');

  function adapter(
    config: AxiosAdapterRequestConfig,
  ): AxiosAdapterPlatformTask {
    const options = transformOptions(config);
    switch (config.type) {
      case 'request':
        return processRequest(platform.request, options);
      case 'download':
        return processDownload(platform.download, options);
      case 'upload':
        return processUpload(platform.upload, options);
    }
  }

  function transformOptions(
    config: AxiosAdapterRequestConfig,
  ): AxiosAdapterBaseOptions {
    return {
      ...config,
      header: config.headers,
      success(response: AxiosAdapterResponse) {
        transformResponse(response);
        config.success(response);
      },
      fail(responseError: AxiosAdapterResponseError) {
        responseError.data = {
          errMsg: responseError.errMsg,
          errno: responseError.errno,
        };
        transformResponse(responseError);
        config.fail(responseError);
      },
    };
  }

  function transformResponse(
    response: AxiosAdapterResponse | AxiosAdapterResponseError,
  ) {
    response.status = response.status ?? response.statusCode;
    response.headers = response.headers ?? response.header;

    origIgnore(response, ['statusCode', 'errMsg', 'errno', 'header']);
  }

  function processRequest(
    request: AxiosAdapterRequest,
    baseOptions: AxiosAdapterBaseOptions,
  ): AxiosAdapterPlatformTask {
    return request(baseOptions);
  }

  function processUpload(
    upload: AxiosAdapterUpload,
    baseOptions: AxiosAdapterBaseOptions,
  ): AxiosAdapterPlatformTask {
    const options = baseOptions as AxiosAdapterUploadOptions;
    const { name, filePath, fileType, ...formData } = options.data as AnyObject;
    options.name = name;
    options.fileName = name;
    options.filePath = filePath;
    options.fileType = fileType;
    options.formData = formData;

    origIgnore(options, ['params', 'data']);

    return upload(options);
  }

  function processDownload(
    download: AxiosAdapterDownload,
    baseOptions: AxiosAdapterBaseOptions,
  ): AxiosAdapterPlatformTask {
    const options = baseOptions as AxiosAdapterDownloadOptions;
    const { params, success } = options;
    options.filePath = params?.filePath;
    options.success = (response) => {
      response.data = {
        filePath: response.filePath,
        tempFilePath:
          response.tempFilePath ||
          // response.apFilePath 为支付宝小程序基础库小于 2.7.23 的特有属性。
          response.apFilePath,
      };

      origIgnore(response, ['tempFilePath', 'apFilePath', 'filePath']);

      success(response);
    };

    origIgnore(options, ['params']);

    return download(options);
  }

  return adapter;
}
