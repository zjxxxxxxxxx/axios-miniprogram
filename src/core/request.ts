import { isFunction, isPlainObject, isString } from '../helpers/isTypes';
import { assert } from '../helpers/error';
import {
  AxiosAdapterRequestConfig,
  AxiosAdapterRequestMethod,
  AxiosAdapterResponse,
  AxiosAdapterResponseError,
} from '../adapter';
import {
  AxiosProgressCallback,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseError,
} from './Axios';
import { isCancelToken } from './cancel';
import { AxiosErrorResponse, createError } from './createError';
import { generateType } from './generateType';

function tryToggleProgressUpdate(
  adapterConfig: AxiosAdapterRequestConfig,
  progressUpdate?: (callback: AxiosProgressCallback) => void,
) {
  const { onUploadProgress, onDownloadProgress } = adapterConfig;
  if (isFunction(progressUpdate)) {
    switch (adapterConfig.type) {
      case 'upload':
        if (isFunction(onUploadProgress)) {
          progressUpdate(onUploadProgress);
        }
        break;
      case 'download':
        if (isFunction(onDownloadProgress)) {
          progressUpdate(onDownloadProgress);
        }
        break;
      default:
    }
  }
}

export function request<TData = unknown>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<TData>> {
  return new Promise((resolve, reject) => {
    assert(isFunction(config.adapter), 'adapter 不是一个 function');
    assert(isString(config.url), 'url 不是一个 string');

    const adapterConfig: AxiosAdapterRequestConfig = {
      ...config,
      url: config.url,
      type: generateType(config),
      method: config.method!.toUpperCase() as AxiosAdapterRequestMethod,
      success,
      fail,
    };

    const adapterTask = config.adapter!(adapterConfig);

    function success(_: AxiosAdapterResponse<TData>): void {
      const response = _ as AxiosResponse<TData>;
      response.config = config;
      response.request = adapterTask;
      if (
        !isFunction(config.validateStatus) ||
        config.validateStatus(response.status)
      ) {
        resolve(response);
      } else {
        catchError('请求失败', response);
      }
    }

    function fail(_: AxiosAdapterResponseError): void {
      const responseError = _ as AxiosResponseError;
      responseError.isFail = true;
      responseError.config = config;
      responseError.request = adapterTask;
      catchError('网络错误', responseError);
    }

    function catchError(
      message: string,
      errorResponse: AxiosErrorResponse,
    ): void {
      reject(createError(message, config, errorResponse, adapterTask));
    }

    if (isPlainObject(adapterTask)) {
      tryToggleProgressUpdate(adapterConfig, adapterTask.onProgressUpdate);
    }

    const { cancelToken } = config;
    if (isCancelToken(cancelToken)) {
      cancelToken.onCancel((reason) => {
        if (isPlainObject(adapterTask)) {
          tryToggleProgressUpdate(adapterConfig, adapterTask.offProgressUpdate);

          if (isFunction(adapterTask.abort)) {
            adapterTask.abort();
          }
        }

        reject(reason);
      });
    }
  });
}
