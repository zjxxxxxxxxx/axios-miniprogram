/*
 * @Author: early-autumn
 * @Date: 2020-04-17 14:09:16
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-19 15:47:36
 */
import { AxiosRequestConfig, AxiosResponse, Response } from '../types';
import { pick } from '../helper/utils';

/**
 * 各大平台通用响应体转成 Axios 响应体
 *
 * 抹平差异
 *
 * @param response 通用响应体
 * @param request  通用请求配置
 * @param config   Axios 请求配置
 */
export default function responseOk(response: Response, config: AxiosRequestConfig): AxiosResponse {
  const status = response.status ?? response.statusCode;
  const headers = response.headers ?? response.header;
  const statusText = status === 200 ? 'OK' : status === 400 ? 'Bad Adapter' : '';

  return {
    status,
    statusText,
    headers,
    config,
    ...pick<Response, 'data' | 'cookies' | 'profile'>(response, 'data', 'cookies', 'profile'),
  };
}
