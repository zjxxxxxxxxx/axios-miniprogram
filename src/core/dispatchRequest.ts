import { isFunction, isString } from '../helpers/isTypes';
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

  config.url = transformURL(config);
  config.headers = flattenHeaders(config);

  if (withDataRE.test(config.method!)) {
    transformer(config, config.transformRequest);
  }

  function onSuccess(response: AxiosResponse) {
    throwIfCancellationRequested(config);
    transformer(response, config.transformResponse);

    return response;
  }

  function onError(reason: Cancel | AxiosErrorResponse) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      transformer(reason.response, config.transformResponse);
    }

    return Promise.reject(reason);
  }

  function transformer<TData = unknown>(
    target: { data?: TData; headers?: AnyObject },
    fn?: AxiosTransformer<TData>,
  ) {
    target.data = transformData(target.data, target.headers, fn);
  }

  return request(config).then(onSuccess, onError);
}
