import { WITH_DATA_RE } from '../constants/methods';
import { isFunction, isString } from '../helpers/isTypes';
import { assert } from '../helpers/error';
import { AxiosRequestConfig, AxiosResponse } from '../core/Axios';
import { Cancel, isCancel, isCancelToken } from './cancel';
import { flattenHeaders } from './flattenHeaders';
import { AxiosTransformer, transformData } from './transformData';
import { request } from './request';
import { AxiosErrorResponse } from './createError';

/**
 * 发送请求
 *
 * 校验配置，转换配置，转换数据，捕获取消请求。
 *
 * @param config 请求配置
 */
export function dispatchRequest(config: AxiosRequestConfig) {
  throwIfCancellationRequested(config);

  assert(isFunction(config.adapter), 'adapter 不是一个 function');
  assert(isString(config.url), 'url 不是一个 string');
  assert(isString(config.method), 'method 不是一个 string');

  config.headers = flattenHeaders(config);

  // 可以携带 data 的请求方法，转换 data
  // 否则，删除 data
  if (WITH_DATA_RE.test(config.method!)) {
    dataTransformer(config, config.transformRequest);
  } else {
    delete config.data;
  }

  function onSuccess(response: AxiosResponse) {
    throwIfCancellationRequested(config);
    dataTransformer(response, config.transformResponse);

    return response;
  }

  function onError(error: Cancel | AxiosErrorResponse) {
    if (!isCancel(error)) {
      throwIfCancellationRequested(config);
      dataTransformer(error.response, config.transformResponse);
    }

    return Promise.reject(error);
  }

  function dataTransformer<TData = unknown>(
    target: { data?: TData; headers?: AnyObject },
    fn?: AxiosTransformer<TData>,
  ) {
    target.data = transformData(target.data, target.headers, fn);
  }

  return request(config).then(onSuccess, onError);
}

function throwIfCancellationRequested(config: AxiosRequestConfig) {
  const { cancelToken } = config;
  if (isCancelToken(cancelToken)) {
    cancelToken.throwIfRequested();
  }
}
