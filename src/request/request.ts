import { isFunction, isPlainObject } from '../helpers/types';
import { transformURL } from '../helpers/transformURL';
import { getHttpStatusText } from '../helpers/getHttpStatusText';
import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseError,
} from '../core/Axios';
import {
  AxiosAdapterRequestConfig,
  AxiosAdapterResponse,
  AxiosAdapterResponseError,
  AxiosAdapterPlatformTask,
  AxiosAdapterRequestMethod,
} from '../adpater/createAdapter';
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
    const adapterConfig: AxiosAdapterRequestConfig = {
      ...(config as AxiosAdapterRequestConfig),
      type: generateType(config),
      url: transformURL(config),
      method: config.method!.toUpperCase() as AxiosAdapterRequestMethod,
      success,
      fail,
    };

    let adapterTask: AxiosAdapterPlatformTask;
    try {
      adapterTask = config.adapter!(adapterConfig);
    } catch (err) {
      fail({
        status: 400,
        statusText: 'Bad Adapter',
      });

      console.error(err);
    }

    function success(rawResponse: AxiosAdapterResponse): void {
      const response = rawResponse as AxiosResponse;
      response.status ||= 200;
      response.statusText ||= getHttpStatusText(response.status);
      response.headers ||= {};
      response.config = config;
      response.request = adapterTask;

      const { validateStatus } = config;
      if (!isFunction(validateStatus) || validateStatus(response.status)) {
        resolve(response);
      } else {
        catchError('validate status error', response);
      }
    }

    function fail(rawResponseError: AxiosAdapterResponseError): void {
      const responseError = rawResponseError as AxiosResponseError;
      responseError.isFail = true;
      responseError.status ||= 400;
      responseError.statusText ||= getHttpStatusText(responseError.status);
      responseError.headers ||= {};
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

function tryToggleProgressUpdate(
  config: AxiosAdapterRequestConfig,
  toggle?: (cb: (event: AnyObject) => void) => void,
) {
  if (isFunction(toggle)) {
    const { type, onUploadProgress, onDownloadProgress } = config;
    switch (type) {
      case 'upload':
        if (isFunction(onUploadProgress)) {
          toggle(onUploadProgress);
        }
        break;
      case 'download':
        if (isFunction(onDownloadProgress)) {
          toggle(onDownloadProgress);
        }
        break;
    }
  }
}
