import { isFunction, isPlainObject } from '../helpers/isTypes';
import { assert } from '../helpers/error';
import {
  AxiosAdapterRequestConfig,
  AxiosAdapterRequestMethod,
  AxiosAdapterTask,
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

    const adapterConfig: AxiosAdapterRequestConfig = {
      ...config,
      url: config.url ?? '',
      type: generateType(config),
      method: config.method!.toUpperCase() as AxiosAdapterRequestMethod,
      success,
      fail,
    };

    const adapterTask = config.adapter?.(adapterConfig) as
      | AxiosAdapterTask
      | undefined;

    function success(response: AxiosResponse<TData>): void {
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

    function fail(error: AxiosResponseError): void {
      error.config = config;
      error.request = adapterTask;
      catchError('网络错误', error);
    }

    function catchError(message: string, response?: AxiosErrorResponse): void {
      reject(createError(message, config, adapterTask, response));
    }

    if (isPlainObject(adapterTask)) {
      tryToggleProgressUpdate(adapterConfig, adapterTask.onProgressUpdate);
    }

    if (isCancelToken(config.cancelToken)) {
      config.cancelToken.onCancel((reason: unknown) => {
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
