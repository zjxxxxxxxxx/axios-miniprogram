import { AxiosRequestConfig, AxiosResponse, Response } from '../types';
/**
 * 各大平台通用响应体转成 Axios 响应体
 *
 * 抹平差异
 *
 * @param response 通用响应体
 * @param config   Axios 请求配置
 */
export default function transformResponse(response: Response, config: AxiosRequestConfig): AxiosResponse;
