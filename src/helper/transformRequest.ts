/*
 * @Author: early-autumn
 * @Date: 2020-04-17 15:05:43
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 22:22:50
 */
import { Method, AxiosRequestConfig, PlatformRequestConfig } from '../types';
import transformURL from './transformURL';

export default function transformRequest(config: AxiosRequestConfig): PlatformRequestConfig {
  return {
    ...config,
    url: transformURL(config),
    method: config.method as Method,
    header: config.headers,
  };
}
