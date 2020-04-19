/*
 * @Author: early-autumn
 * @Date: 2020-04-18 12:00:01
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 00:41:57
 */
import { AliasMethod, Headers, AxiosRequestConfig } from '../types';
import { omit } from '../helpers/utils';

/**
 * 拉平请求头
 *
 * @param config Axios 请求配置
 */
export default function flattenHeaders(config: AxiosRequestConfig): Headers {
  const { headers } = config;

  if (headers === undefined) {
    return {};
  }

  const method = (config.method as string).toLowerCase() as AliasMethod;

  return {
    ...(headers.common ?? {}),
    ...(headers[method] ?? {}),
    ...omit(headers, 'common', 'options', 'get', 'head', 'post', 'put', 'delete', 'trace', 'connect'),
  };
}
