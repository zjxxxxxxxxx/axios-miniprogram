import { isFunction, isPlainObject } from '../helpers/isTypes';
import {
  AxiosAdapterRequestConfig,
  AxiosAdapterRequestMethod,
  AxiosAdapterResponse,
  AxiosAdapterResponseError,
  AxiosAdapterPlatformTask,
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

/**
 * 开始请求
 *
 * 创建适配器配置并调用适配器，监听取消请求，注册监听回调，处理响应体和错误体，抛出异常。
 *
 * @param config 请求配置
 */
export function request(config: AxiosRequestConfig) {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const { adapter, url, method, cancelToken } = config;

    const adapterConfig: AxiosAdapterRequestConfig = {
      ...config,
      url: url!,
      type: generateType(config),
      method: method as AxiosAdapterRequestMethod,
      success,
      fail,
    };

    let adapterTask: AxiosAdapterPlatformTask;
    try {
      adapterTask = adapter!(adapterConfig);
    } catch (err) {
      fail({
        status: 400,
        statusText: 'Bad Adapter',
      });

      console.error(err);
    }

    function success(baseResponse: AxiosAdapterResponse): void {
      const response = baseResponse as AxiosResponse;
      response.status = response.status ?? 200;
      response.statusText = response.statusText ?? 'OK';
      response.headers = response.headers ?? {};
      response.config = config;
      response.request = adapterTask;

      const { validateStatus } = config;
      if (!isFunction(validateStatus) || validateStatus(response.status)) {
        resolve(response);
      } else {
        catchError('validate status error', response);
      }
    }

    function fail(baseResponseError: AxiosAdapterResponseError): void {
      const responseError = baseResponseError as AxiosResponseError;
      responseError.isFail = true;
      responseError.status = responseError.status ?? 400;
      responseError.statusText = responseError.statusText ?? 'Fail';
      responseError.headers = responseError.headers ?? {};
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

function tryToggleProgressUpdate(
  adapterConfig: AxiosAdapterRequestConfig,
  adapterProgress?: (callback: AxiosProgressCallback) => void,
) {
  const { onUploadProgress, onDownloadProgress } = adapterConfig;
  if (isFunction(adapterProgress)) {
    switch (adapterConfig.type) {
      case 'upload':
        if (isFunction(onUploadProgress)) {
          adapterProgress(onUploadProgress);
        }
        break;
      case 'download':
        if (isFunction(onDownloadProgress)) {
          adapterProgress(onDownloadProgress);
        }
        break;
    }
  }
}
