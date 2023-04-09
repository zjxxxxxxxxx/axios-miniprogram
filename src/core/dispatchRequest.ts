import { isFunction } from '../helpers/isTypes';
import { isCancel, isCancelToken } from './cancel';
import { flattenHeaders } from './flattenHeaders';
import { AxiosTransformer, transformData } from './transformData';
import { request } from './request';
import { AxiosRequestConfig, AxiosResponse } from './Axios';
import { transformURL } from './transformURL';
import { isAxiosError } from './createError';

function throwIfCancellationRequested(config: AxiosRequestConfig) {
  const { cancelToken } = config;
  if (isCancelToken(cancelToken)) {
    cancelToken.throwIfRequested();
  }
}

export function dispatchRequest(config: AxiosRequestConfig) {
  throwIfCancellationRequested(config);

  const { transformRequest, transformResponse } = config;

  config.url = transformURL(config);
  config.method = config.method ?? 'get';
  config.headers = flattenHeaders(config);

  transformer(config, transformRequest);

  function onSuccess(response: AxiosResponse) {
    throwIfCancellationRequested(config);

    transformer(response, transformResponse);
    return response;
  }

  function onError(reason: unknown) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      if (isAxiosError(reason)) {
        transformer(reason.response as AxiosResponse, transformResponse);
      }
    }

    if (isFunction(config.errorHandler)) {
      return config.errorHandler(reason);
    }

    return Promise.reject(reason);
  }

  function transformer<TData = unknown>(
    targetObject: { data?: TData; headers?: AnyObject },
    transformer?: AxiosTransformer<TData>,
  ) {
    targetObject.data = transformData(
      targetObject.data,
      targetObject.headers,
      transformer,
    );
  }

  return request(config).then(onSuccess).catch(onError);
}
