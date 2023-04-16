import { isFunction, isPromise, isString } from '../helpers/isTypes';
import { assert } from '../helpers/error';
import { Cancel, isCancel, isCancelToken } from './cancel';
import { flattenHeaders } from './flattenHeaders';
import { AxiosTransformer, transformData } from './transformData';
import { request, withDataRE } from './request';
import { AxiosRequestConfig, AxiosResponse } from './Axios';
import { transformURL } from './transformURL';
import { AxiosErrorResponse } from './createError';

function throwIfCancellationRequested(config: AxiosRequestConfig) {
  const { cancelToken } = config;
  if (isCancelToken(cancelToken)) {
    cancelToken.throwIfRequested();
  }
}

export function dispatchRequest(config: AxiosRequestConfig) {
  throwIfCancellationRequested(config);

  assert(isFunction(config.adapter), 'adapter 不是一个 function');
  assert(isString(config.url), 'url 不是一个 string');
  assert(isString(config.method), 'method 不是一个 string');

  const { errorHandler, transformRequest, transformResponse } = config;

  config.url = transformURL(config);
  config.headers = flattenHeaders(config);

  if (withDataRE.test(config.method!)) {
    transformer(config, transformRequest);
  }

  function onSuccess(response: AxiosResponse) {
    throwIfCancellationRequested(config);
    transformer(response, transformResponse);
    return response;
  }

  function onError(reason: Cancel | AxiosErrorResponse) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      transformer(reason.response, transformResponse);
    }

    if (isFunction(errorHandler)) {
      const promise = errorHandler(reason);
      if (isPromise(promise)) {
        return promise.then(() => Promise.reject(reason));
      }
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
