/*
 * @Author: early-autumn
 * @Date: 2020-04-17 00:00:21
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 00:09:47
 */
import { AxiosRequestConfig } from '../types';
import { isAbsoluteURL, combineURL } from './utils';
import processURL from './processURL';

/**
 * baseURL + url + params 得到完整请求地址
 *
 * @param config 请求配置
 */
export default function transformURL(config: AxiosRequestConfig): string {
  const { baseURL = '', url = '', params, paramsSerializer } = config;
  const fullURL = isAbsoluteURL(url) ? url : combineURL(baseURL, url);

  return processURL(fullURL, params, paramsSerializer);
}
