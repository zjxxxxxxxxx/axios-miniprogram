/*
 * @Author: early-autumn
 * @Date: 2020-04-16 00:48:45
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 22:18:07
 */

import { AxiosRequestConfig, AxiosResponse, PlatformResponse } from '../types';
import transformRequest from '../helper/transformRequest';
import transformResponse from '../helper/transformResponse';
import autoAdapter from '../adapter/autoAdapter';
import createError from './createError';

/**
 * 请求适配器
 *
 * @param config 请求配置
 */
export default function requestAdapter(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise(function dispatchRequestAdapter(resolve, reject): void {
    const { adapter = autoAdapter, cancelToken } = config;
    const requestConfig = transformRequest(config);

    /**
     * 抛出异常
     *
     * @param param0   错误信息
     * @param response 请求响应体
     */
    function catchError(message: any, response?: AxiosResponse): void {
      if (typeof message !== 'string') {
        message = '网络错误';
      }

      reject(createError(message, config, requestConfig, response));
    }

    if (adapter === undefined) {
      catchError('平台适配失败，您需要参阅文档使用自定义适配器手动适配当前平台');

      return;
    }

    /**
     * 检查请求结果的状态码
     *
     * @param result 请求结果
     */
    function checkStatusCode(result: PlatformResponse): void {
      const response = transformResponse(result, config);

      if (config.validateStatus === undefined || config.validateStatus(response.status)) {
        resolve(response);
      } else {
        catchError(`请求失败，状态码为 ${status}`, response);
      }
    }

    // 发送请求
    const requestTask = adapter({
      ...requestConfig,
      success: checkStatusCode,
      fail: catchError,
    });

    // 如果存在取消令牌
    // 则调用取消令牌里的 listener 监听用户的取消操作
    if (cancelToken !== undefined) {
      cancelToken.listener.then(function onCanceled(reason): void {
        requestTask.abort();
        reject(reason);
      });
    }
  });
}
