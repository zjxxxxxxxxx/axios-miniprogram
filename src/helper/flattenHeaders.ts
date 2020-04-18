/*
 * @Author: early-autumn
 * @Date: 2020-04-18 12:00:01
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-19 02:32:15
 */
import { AliasMethod, Headers, AxiosRequestConfig } from '../types';
import { merge } from './utils';

/**
 * 拉平请求头
 *
 * @param config Axios 请求配置
 */
export default function flattenHeaders(config: AxiosRequestConfig): Headers {
  let { headers = {} } = config;
  const method = (config.method as string).toLowerCase() as AliasMethod;

  headers = merge(headers.common ?? {}, headers[method] ?? {}, headers);

  ['common', 'options', 'delete', 'get', 'head', 'post', 'put', 'trace', 'connect'].forEach((key: string) => {
    delete headers[key];
  });

  return headers;
}
