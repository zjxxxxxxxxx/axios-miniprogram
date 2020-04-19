/*
 * @Author: early-autumn
 * @Date: 2020-04-17 15:05:43
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-19 19:01:02
 */
import { Method, Data, Headers, AdapterMethod, AxiosRequestConfig, RequestConfig } from '../types';
import { pick } from '../helper/utils';
import transformURL from '../helper/transformURL';

/**
 * 请求方法转全大写
 *
 * @param config Axios 请求配置
 */
function methodUppercase(config: AxiosRequestConfig): AdapterMethod {
  return (config.method as Method).toUpperCase() as AdapterMethod;
}

/**
 * Axios 请求配置转换成各大平台通用请求配置
 *
 * 抹平差异
 *
 * @param config Axios 请求配置
 */
export default function requestConfigOk(config: AxiosRequestConfig): RequestConfig {
  const { headers, data } = config;
  const url = transformURL(config);
  const method = methodUppercase(config);

  type Keys = 'dataType' | 'responseType' | 'timeout' | 'enableHttp2' | 'enableQuic' | 'enableCache' | 'sslVerify';

  return {
    url,
    method,
    header: headers as Headers,
    headers: headers as Headers,
    data: data as Data,
    ...pick<AxiosRequestConfig, Keys>(
      config,
      'dataType',
      'responseType',
      'timeout',
      'enableHttp2',
      'enableQuic',
      'enableCache',
      'sslVerify'
    ),
  };
}
