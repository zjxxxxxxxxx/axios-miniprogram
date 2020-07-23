import { AxiosRequestConfig, AxiosResponse } from '../types';
import isCancel from '../cancel/isCancel';
import flattenHeaders from './flattenHeaders';
import transformData from './transformData';
import request from './request';

/**
 * 如果已经取消, 则抛出取消对象
 *
 * @param config Axios 请求配置
 */
function throwIfCancellationRequested(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * 发送请求
 *
 * @param config Axios 请求配置
 */
export default function dispatchRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
  throwIfCancellationRequested(config);

  config.headers = flattenHeaders(config);

  config.data = transformData(config.data ?? {}, config.headers, config.transformRequest);

  function onResolved(response: AxiosResponse): AxiosResponse {
    throwIfCancellationRequested(config);

    response.data = transformData(response.data, response.headers, config.transformResponse);

    return response;
  }

  function onRejected(reason: any): Promise<any> {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      if (reason.response !== void 0) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return config.errorHandler?.(reason) ?? Promise.reject(reason);
  }

  return request(config).then(onResolved, onRejected);
}
