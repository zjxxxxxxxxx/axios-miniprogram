/*
 * @Author: early-autumn
 * @Date: 2020-04-13 18:01:16
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-15 23:19:04
 */
import { MethodType, AxiosRequest, AxiosResponse } from '../types';
import createError from './createError';

/**
 * 发送请求
 *
 * @param config 请求配置
 */
export default function request(config: AxiosRequest): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const { cancelToken, method, ...options } = config;
    // method 转为全大写
    const methodType = method?.toUpperCase() as MethodType;

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
      const response = { ...result, config };
      const { statusCode, errMsg } = response;

      // 成功
      if (statusCode >= 200 && statusCode < 300) {
        resolve(response);
      }
      // 失败
      else {
        // `Request failed with status code ${statusCode}`
        catchError({ errMsg }, response);
      }
    }

    // 发送请求
    // 替换 options 中的 success fail complete
    const request = wx.request({
      ...options,
      method: methodType,
      success: checkStatusCode,
      fail: catchError,
      complete: undefined,
    });

    // 如果存在取消令牌
    // 则调用取消令牌里的 listener 监听用户的取消操作
    if (cancelToken !== undefined) {
      cancelToken.listener.then(function onCanceled(reason): void {
        request.abort();
        reject(reason);
      });
    }
  });
}
