import {
  assert,
  isEmptyArray,
  isPlainObject,
  isPlatform,
  isUndefined,
  revisePlatformApiNames,
  throwError,
} from '../utils';
import {
  AxiosProgressCallback,
  AxiosRequestConfig,
  AxiosRequestData,
  AxiosRequestFormData,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosResponseError,
} from './Axios';

export type AdapterRequestMethod =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';

export type AdapterRequestType = 'request' | 'download' | 'upload';

export interface AxiosAdapterRequestConfig extends AxiosRequestConfig {
  type: AdapterRequestType;
  method: AdapterRequestMethod;
  url: string;
  success(response: AxiosResponse): void;
  fail(error: AxiosResponseError): void;
}

export interface AxiosAdapterRequestOptions extends AxiosAdapterRequestConfig {
  header?: AxiosRequestHeaders;
  success(response: any): void;
  fail(error: any): void;
}

export interface AxiosAdapterUploadOptions extends AxiosAdapterRequestOptions {
  filePath: string;
  name: string;
  fileName: string;
  fileType: 'image' | 'video' | 'audio';
  hideLoading?: boolean;
  formData?: AxiosRequestData;
}

export interface AxiosAdapterDownloadOptions
  extends AxiosAdapterRequestOptions {
  filePath?: string;
  fileName?: string;
}

export interface AxiosAdapterRequest {
  (config: AxiosAdapterRequestOptions): AxiosAdapterTask | void;
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

export function createAdapter(platform: AxiosPlatform): AxiosAdapter {
  assert(isPlainObject(platform), 'platform 需要是一个 Object 类型');
  assert(
    isPlatform(platform),
    'platform.request 与 platform.download 和 platform.upload 需要是一个 Function 类型',
  );

  function transformCommon(common: any): void {
    if (!isUndefined(common.statusCode)) {
      common.status = common.statusCode;
      delete common.statusCode;
    }

    if (isUndefined(common.status)) {
      common.status = isUndefined(common.data) ? 400 : 200;
    }

    if (!isUndefined(common.header)) {
      common.headers = common.header;
      delete common.header;
    }

    if (isUndefined(common.headers)) {
      common.headers = {};
    }

    if (!isUndefined(common.errMsg)) {
      common.statusText = common.errMsg;
      delete common.errMsg;
    }

    if (isUndefined(common.statusText)) {
      common.statusText =
        common.status === 200
          ? 'OK'
          : common.status === 400
          ? 'Bad Adapter'
          : '';
    }
  }

  function generateDownloadResponseData(response: any): void {
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

  function requestAdapter(
    request: AxiosAdapterRequest,
    config: AxiosAdapterRequestConfig,
  ): AxiosAdapterTask | void {
    const options = Object.assign({}, config, {
      header: config.headers,
      success(response: any): void {
        transformCommon(response);
        config.success(response);
      },
      fail(error: any): void {
        transformCommon(error);
        config.fail(error);
      },
    });

    return request(options);
  }

  function uploadAdapter(
    upload: AxiosAdapterUpload,
    config: AxiosAdapterRequestConfig,
  ): AxiosAdapterTask | void {
    const {
      fileName,
      filePath,
      fileType,
      hideLoading,
      ...formData
    } = config.data as AxiosRequestFormData;
    const options = Object.assign({}, config, {
      header: config.headers,
      name: fileName,
      fileName: fileName,
      filePath,
      fileType: fileType ?? 'image',
      hideLoading,
      formData,
      success(response: any): void {
        transformCommon(response);
        config.success(response);
      },
      fail(error: any): void {
        transformCommon(error);
        config.fail(error);
      },
    });

    return upload(options);
  }

  function downloadAdapter(
    download: AxiosAdapterDownload,
    config: AxiosAdapterRequestConfig,
  ): AxiosAdapterTask | void {
    const options = Object.assign({}, config, {
      header: config.headers,
      filePath: config.params?.filePath,
      fileName: config.params?.fileName,
      success(response: any): void {
        generateDownloadResponseData(response);
        transformCommon(response);
        config.success(response);
      },
      fail(error: any): void {
        transformCommon(error);
        config.fail(error);
      },
    });

    return download(options);
  }

  return function adapterDefault(
    config: AxiosAdapterRequestConfig,
  ): AxiosAdapterTask | void {
    switch (config.type) {
      case 'request':
        return requestAdapter(platform.request, config);
      case 'upload':
        return uploadAdapter(platform.upload, config);
      case 'download':
        return downloadAdapter(platform.download, config);
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
