/*
 * @Author: early-autumn
 * @Date: 2020-04-13 18:01:16
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 22:51:17
 */
import { AxiosRequestConfig, AxiosPromise } from '../types';
import createError from './createError';

/**
 * 发送请求
 *
 * @param config 请求配置
 */
export default function request(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { cancelToken, method, ...options } = config;

    // method 转为全大写
    const methodType = (method?.toUpperCase() ?? 'GET') as WechatMiniprogram.RequestOption['method'];

    function catchError({ errMsg }: WechatMiniprogram.GeneralCallbackResult): void {
      reject(createError(errMsg, config));
    }

    function handleResponse(result: WechatMiniprogram.RequestSuccessCallbackResult): void {
      const response = { ...result, config };
      const { statusCode, errMsg } = response;

      if (statusCode >= 200 && statusCode < 300) {
        resolve(response);
      } else {
        reject(createError(!!errMsg ? errMsg : `Request failed with status code ${statusCode}`, config, response));
      }
    }

    // 替换 config 中的 success fail complete
    const request = wx.request({
      ...options,
      method: methodType,
      success: handleResponse,
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
