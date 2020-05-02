/*
 * @Author: early-autumn
 * @Date: 2020-04-17 15:05:43
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-25 09:27:30
 */
import { AxiosRequestConfig, RequestConfig } from '../types';
import { pick } from '../helpers/utils';
import isAbsoluteURL from '../helpers/isAbsoluteURL';
import combineURL from '../helpers/combineURL';
import buildURL from '../helpers/buildURL';
import { methodToUppercase } from './transformMethod';

/**
 * 根据配置中的 baseURL 和 url 和 params 生成完整 URL
 *
 * @param config Axios 请求配置
 */
function transformURL(config: AxiosRequestConfig): string {
  const { baseURL = '', url = '' } = config;
  const fullURL = isAbsoluteURL(url) ? url : combineURL(baseURL, url);

  return buildURL(fullURL, config.params, config.paramsSerializer);
}

/**
 * Axios 请求配置转换成各大平台通用请求配置
 *
 * 抹平差异
 *
 * @param config Axios 请求配置
 */
export default function transformRequest(config: AxiosRequestConfig): RequestConfig {
  return {
    url: transformURL(config),

    method: methodToUppercase(config.method),

    header: config.headers,

    ...pick(
      config,
      'data',
      'headers',
      'dataType',
      'responseType',
      'timeout',
      'enableHttp2',
      'enableQuic',
      'enableCache',
      'sslVerify'
    ),
  } as RequestConfig;
}
