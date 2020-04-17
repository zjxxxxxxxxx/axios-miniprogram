/*
 * @Author: early-autumn
 * @Date: 2020-04-16 00:48:45
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 11:43:25
 */

import { MethodType, AxiosRequestConfig, AxiosResponse } from '../types';
import transformURL from '../helper/transformURL';
import createError from './createError';

/**
 * 请求适配器
 *
 * @param config 请求配置
 */
export default function requestAdapter(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise(function dispatchRequestAdapter(resolve, reject): void {
    const { adapter, cancelToken } = config;

    /**
     * 抛出异常
     *
     * @param param0   错误信息
     * @param response 请求响应体
     */
    function catchError({ errMsg }: { errMsg: string }, response?: AxiosResponse): void {
      reject(createError(errMsg, config, response));
    }

    if (adapter === undefined) {
      catchError({ errMsg: '请求失败，适配器未定义' });

      return;
    }

    /**
     * 检查请求结果的状态码
     *
     * @param result 请求结果
     */
    function checkStatusCode(result: WechatMiniprogram.RequestSuccessCallbackResult): void {
      const { statusCode, header: headers, ...baseResponse } = result;
      const response = { ...baseResponse, statusCode, headers, config };

      if (config.validateStatus === undefined || config.validateStatus(statusCode)) {
        resolve(response);
      } else {
        catchError({ errMsg: `请求失败，状态码为 ${statusCode}` }, response);
      }
    }

    // 发送请求
    const requestTask = adapter({
      ...config,
      url: transformURL(config),
      method: config.method as MethodType,
      header: config.headers,
      success: checkStatusCode,
      fail: catchError,
      complete: undefined,
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
