import { AxiosRequestConfig, RequestConfig } from '../types';
/**
 * Axios 请求配置转换成各大平台通用请求配置
 *
 * 抹平差异
 *
 * @param config Axios 请求配置
 */
export default function transformRequest(config: AxiosRequestConfig): RequestConfig;
