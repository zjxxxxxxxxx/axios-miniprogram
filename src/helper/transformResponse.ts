/*
 * @Author: early-autumn
 * @Date: 2020-04-17 14:09:16
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 15:36:52
 */
import { AxiosRequestConfig, AxiosResponse, PlatformResponse } from '../types';

/**
 * 各大平台响应体转换成统一数据结构, 抹平差异
 *
 * @param response 响应体
 * @param config   请求配置
 */
export default function transformResponse(response: PlatformResponse, config: AxiosRequestConfig): AxiosResponse {
  const { status, statusCode, headers, header, ...attrPoint } = response;
  const responseStatus = status ?? statusCode;
  const responseHeaders = headers ?? header;
  const responseStatusText = responseStatus === 200 ? 'OK' : responseStatus === 400 ? 'Bad PlatformRequest' : '';

  return {
    ...attrPoint,
    status: responseStatus,
    statusText: responseStatusText,
    headers: responseHeaders,
    config,
  };
}
