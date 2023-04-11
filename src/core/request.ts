import { isFunction, isPlainObject } from '../helpers/isTypes';
import {
  AxiosAdapterRequestConfig,
  AxiosAdapterRequestMethod,
  AxiosAdapterResponse,
  AxiosAdapterResponseError,
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
    }
  }
}

export function request(config: AxiosRequestConfig) {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const { adapter, url, method, cancelToken } = config;

    const adapterConfig: AxiosAdapterRequestConfig = {
      ...config,
      url: url!,
      type: generateType(config),
      method: method!.toUpperCase() as AxiosAdapterRequestMethod,
      success,
      fail,
    };

    let adapterTask: AxiosAdapterTask;
    try {
      adapterTask = adapter!(adapterConfig);
    } catch {
      fail({
        status: 400,
        statusText: 'Bad Adapter',
        headers: {},
      });
    }

    function success(_: AxiosAdapterResponse): void {
      const response = _ as AxiosResponse;
      response.config = config;
      response.request = adapterTask;

      if (config.validateStatus?.(response.status) ?? true) {
        resolve(response);
      } else {
        catchError('validate status fail', response);
      }
    }

    function fail(_: AxiosAdapterResponseError): void {
      const responseError = _ as AxiosResponseError;
      responseError.isFail = true;
      responseError.config = config;
      responseError.request = adapterTask;
      catchError('request fail', responseError);
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

    if (isCancelToken(cancelToken)) {
      cancelToken.onCancel((reason) => {
        if (isPlainObject(adapterTask)) {
          tryToggleProgressUpdate(adapterConfig, adapterTask.offProgressUpdate);

          adapterTask?.abort?.();
        }

        reject(reason);
      });
    }
  });
}
