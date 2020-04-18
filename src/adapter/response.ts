/*
 * @Author: early-autumn
 * @Date: 2020-04-17 14:09:16
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-18 16:03:37
 */
import { RequestConfig, AxiosRequestConfig, AxiosResponse, Response } from '../types';

/**
 * 各大平台通用响应体转成 Axios 响应体
 *
 * 抹平差异
 *
 * @param response 通用响应体
 * @param request  通用请求配置
 * @param config   Axios 请求配置
 */

export default function responseOk(
  response: Response,
  request: RequestConfig,
  config: AxiosRequestConfig
): AxiosResponse {
  response.status = response.status ?? response.statusCode;
  response.headers = response.headers ?? response.header;

  const { status, headers, data, cookies, profile } = response;
  const statusText = status === 200 ? 'OK' : status === 400 ? 'Bad Adapter' : '';

  return {
    status,
    statusText,
    headers,
    data,
    response,
    request,
    config,
    cookies,
    profile,
  };
}
