import { isFunction, isString } from '../helpers/isTypes';
import { assert } from '../helpers/error';
import { Cancel, isCancel, isCancelToken } from './cancel';
import { flattenHeaders } from './flattenHeaders';
import { AxiosTransformer, transformData } from './transformData';
import { request } from './request';
import { AxiosRequestConfig, AxiosResponse } from './Axios';
import { transformURL } from './transformURL';
import { AxiosErrorResponse } from './createError';
import { requestMethodWithDataNames } from './AxiosDomain';

function throwIfCancellationRequested(config: AxiosRequestConfig) {
  const { cancelToken } = config;
  if (isCancelToken(cancelToken)) {
    cancelToken.throwIfRequested();
  }
}

/**
 * 可以携带 data 的请求方法
 */
const requestMethodWithDataRE = new RegExp(
  `^${requestMethodWithDataNames.join('|')}`,
  'i',
);

export function dispatchRequest(config: AxiosRequestConfig) {
  throwIfCancellationRequested(config);

  assert(isFunction(config.adapter), 'adapter 不是一个 function');
  assert(isString(config.url), 'url 不是一个 string');
  assert(isString(config.method), 'method 不是一个 string');

  config.url = transformURL(config);
  config.headers = flattenHeaders(config);

  // 可以携带 data 的请求方法，转换 data
  // 否则，删除 data
  if (requestMethodWithDataRE.test(config.method!)) {
    dataTransformer(config, config.transformRequest);
  } else {
    delete config.data;
  }

  function onSuccess(response: AxiosResponse) {
    throwIfCancellationRequested(config);
    dataTransformer(response, config.transformResponse);

    return response;
  }

  function onError(reason: Cancel | AxiosErrorResponse) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      dataTransformer(reason.response, config.transformResponse);
    }

    return Promise.reject(reason);
  }

  function dataTransformer<TData = unknown>(
    target: { data?: TData; headers?: AnyObject },
    fn?: AxiosTransformer<TData>,
  ) {
    target.data = transformData(target.data, target.headers, fn);
  }

  return request(config).then(onSuccess, onError);
}
