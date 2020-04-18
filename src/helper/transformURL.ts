/*
 * @Author: early-autumn
 * @Date: 2020-04-17 00:00:21
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-18 16:21:17
 */
import { AxiosRequestConfig } from '../types';
import { isAbsoluteURL, combineURL } from './utils';
import buildURL from './buildURL';

/**
 * 根据配置中的 baseURL 和 url 和 params 生成完整 URL
 *
 * @param config 请求配置
 */
export default function transformURL(config: AxiosRequestConfig): string {
  const { baseURL = '', url = '', params, paramsSerializer } = config;
  const fullURL = isAbsoluteURL(url) ? url : combineURL(baseURL, url);

  return buildURL(fullURL, params, paramsSerializer);
}
