/*
 * @Author: early-autumn
 * @Date: 2020-04-17 15:05:43
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 09:19:49
 */
import { AdapterMethod, AxiosRequestConfig, RequestConfig } from '../types';
import { pick } from '../helpers/utils';
import isAbsoluteURL from '../helpers/isAbsoluteURL';
import combineURL from '../helpers/combineURL';
import buildURL from '../helpers/buildURL';

type PickKeys = 'dataType' | 'responseType' | 'timeout' | 'enableHttp2' | 'enableQuic' | 'enableCache' | 'sslVerify';

/**
 * 请求方法转全大写
 *
 * @param config Axios 请求配置
 */
function methodUppercase(config: AxiosRequestConfig): AdapterMethod {
  return (config.method ?? 'get').toUpperCase() as AdapterMethod;
}

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
  const url = transformURL(config);
  const method = methodUppercase(config);
  const pickRequest = pick<AxiosRequestConfig, PickKeys>(
    config,
    'dataType',
    'responseType',
    'timeout',
    'enableHttp2',
    'enableQuic',
    'enableCache',
    'sslVerify'
  );

  return {
    url,
    method,
    header: config.headers,
    ...pickRequest,
  } as RequestConfig;
}
