/*
 * @Author: early-autumn
 * @Date: 2020-04-13 18:01:16
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-18 15:53:05
 */
import { AxiosRequestConfig, AxiosResponse } from '../types';
import flattenHeaders from '../helper/flattenHeaders';
import transformData from '../helper/transformData';
import isCancel from '../cancel/isCancel';
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

  if (config.method === undefined) {
    config.method = 'get';
  }

  config.headers = flattenHeaders(config);

  config.data = transformData(config.data ?? {}, config.headers, config.transformRequest);

  function onResolved(response: AxiosResponse): AxiosResponse {
    throwIfCancellationRequested(config);

    response.data = transformData(response.data, response.headers, config.transformResponse);

    return response;
  }

  function onRejected(reason: any): any {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      if (reason.response !== undefined) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  }

  return request(config).then(onResolved, onRejected);
}
