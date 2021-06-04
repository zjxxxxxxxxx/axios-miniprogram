import {
  isEmptyArray,
  isFunction,
  isPlainObject,
  isString,
  isUndefined,
} from '../helpers/is';
import { assert, throwError } from '../helpers/utils';
import {
  AxiosProgressCallback,
  AxiosRequestConfig,
  AxiosRequestData,
  AxiosRequestFormData,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosResponseError,
} from './Axios';

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

export function isPlatform(value: any): value is AxiosPlatform {
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

export function createAdapter(platform: AxiosPlatform): AxiosAdapter {
  assert(isPlainObject(platform), 'platform 需要是一个 object');
  assert(isFunction(platform.request), 'platform.request 需要是一个 function');
  assert(isFunction(platform.upload), 'platform.upload 需要是一个 function');
  assert(
    isFunction(platform.download),
    'platform.download 需要是一个 function',
  );

  function transformResult(result: any): void {
    if (!isUndefined(result.statusCode)) {
      result.status = result.statusCode;
      delete result.statusCode;
    }

    if (isUndefined(result.status)) {
      result.status = isUndefined(result.data) ? 400 : 200;
    }

    if (!isUndefined(result.header)) {
      result.headers = result.header;
      delete result.header;
    }

    if (isUndefined(result.headers)) {
      result.headers = {};
    }

    if (!isUndefined(result.errMsg)) {
      result.statusText = result.errMsg;
      delete result.errMsg;
    }

    if (isUndefined(result.statusText)) {
      result.statusText =
        result.status === 200
          ? 'OK'
          : result.status === 400
          ? 'Bad Adapter'
          : '';
    }
  }

  function transformOptions(
    config: AxiosAdapterRequestConfig,
  ): AxiosAdapterBaseOptions {
    return {
      ...config,
      header: config.headers,
      success(response: any): void {
        transformResult(response);
        config.success(response);
      },
      fail(error: any): void {
        transformResult(error);
        config.fail(error);
      },
    };
  }

  function injectDownloadData(response: any): void {
    if (!isPlainObject(response.data)) {
      response.data = {};
    }

    if (!isUndefined(response.tempFilePath)) {
      response.data.tempFilePath = response.tempFilePath;
      delete response.tempFilePath;
    }

    if (!isUndefined(response.apFilePath)) {
      response.data.tempFilePath = response.apFilePath;
      delete response.apFilePath;
    }

    if (!isUndefined(response.filePath)) {
      response.data.filePath = response.filePath;
      delete response.filePath;
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
    assert(
      isPlainObject(baseOptions.data),
      '上传文件时 data 需要是一个 object',
    );
    assert(
      isString(baseOptions.data!.fileName),
      '上传文件时 data.fileName 需要是一个 string',
    );
    assert(
      isString(baseOptions.data!.filePath),
      '上传文件时 data.filePath 需要是一个 string',
    );

    const {
      fileName,
      filePath,
      fileType,
      hideLoading,
      ...formData
    } = baseOptions.data as AxiosRequestFormData;
    const options = {
      ...baseOptions,
      name: fileName,
      fileName: fileName,
      filePath,
      fileType: fileType ?? 'image',
      hideLoading,
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
      success(response: any): void {
        injectDownloadData(response);
        baseOptions.success(response);
      },
    };

    return download(options);
  }

  return function adapterDefault(
    config: AxiosAdapterRequestConfig,
  ): AxiosAdapterTask | void {
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
  };
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
  ];

  let platform;
  while (!isEmptyArray(tryGetPlatforms) && !isPlatform(platform)) {
    try {
      const tryGetPlatform = tryGetPlatforms.shift()!;

      if (isPlainObject((platform = tryGetPlatform()))) {
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
