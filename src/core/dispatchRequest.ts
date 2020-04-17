/*
 * @Author: early-autumn
 * @Date: 2020-04-13 18:01:16
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 19:29:07
 */
import { Method, AxiosRequestConfig, AxiosResponse, Data } from '../types';
import { merge } from '../helper/utils';
import transformData from '../helper/transformData';
import isCancel from '../cancel/isCancel';
import requestAdapter from './requestAdapter';

/**
 * 如果已经取消, 则抛出取消
 */
function throwIfCancellationRequested(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * 发送请求
 *
 * @param config 请求配置
 */
export default function dispatchRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
  throwIfCancellationRequested(config);

  const { method = 'GET', data = {}, headers = {} } = config;

  // 把方法转成全大写
  config.method = method.toUpperCase() as Method;

  // 合并 headers
  config.headers = merge(
    headers.common ?? {},
    (headers[(config.method as string).toLowerCase()] ?? {}) as AnyObject,
    headers
  );

  // 转换请求数据
  config.data = transformData(data, config.headers, config.transformResponse);

  function onResolved(response: AxiosResponse): AxiosResponse {
    throwIfCancellationRequested(config);

    // 转换响应数据
    response.data = transformData(response.data, response.headers, config.transformResponse) as Data;

    return response;
  }

  function onRejected(reason: any): any {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response !== undefined) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        ) as Data;
      }
    }

    return Promise.reject(reason);
  }

  return requestAdapter(config).then(onResolved, onRejected);
}
