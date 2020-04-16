/*
 * @Author: early-autumn
 * @Date: 2020-04-13 18:01:16
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 00:07:35
 */
import { MethodType, ResponseData, AxiosRequestConfig, AxiosResponse } from '../types';
import { merge } from '../helper/utils';
import transformURL from '../helper/transformURL';
import transformData from '../helper/transformData';
import createError from './createError';

import request from './request';

/**
 * 发送请求
 *
 * @param config 请求配置
 */
export default function dispatchRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const { headers = {}, cancelToken, ...options } = config;

    // 把方法转成全大写
    config.method = (config.method?.toUpperCase() ?? 'GET') as MethodType;

    // 合并 headers
    config.headers = merge(
      headers.common ?? {},
      (headers[(config.method as string).toLowerCase()] ?? {}) as AnyObject,
      headers
    );

    // 转换请求数据
    config.data = transformData(config.data, config.headers, config.transformRequest);

    /**
     * 抛出异常
     *
     * @param param0   错误信息
     * @param response 请求响应体
     */
    function catchError({ errMsg }: { errMsg: string }, response?: AxiosResponse): void {
      reject(createError(errMsg, config, response));
    }

    /**
     * 检查请求结果的状态码
     *
     * @param result 请求结果
     */
    function checkStatusCode(result: WechatMiniprogram.RequestSuccessCallbackResult): void {
      const { header: headers, ...rest } = result;
      const response = { ...rest, headers, config };
      const { statusCode, errMsg } = response;

      // 成功
      if (config.validateStatus === undefined || config.validateStatus(statusCode)) {
        // 转换响应数据
        response.data = transformData(response.data, response.headers, config.transformResponse) as ResponseData;

        resolve(response);
      }
      // 失败
      else {
        // `Request failed with status code ${statusCode}`
        catchError({ errMsg }, response);
      }
    }

    // 发送请求
    const requestTask = request({
      ...options,
      url: transformURL(config),
      method: config.method,
      header: config.headers,
      data: config.data,
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
