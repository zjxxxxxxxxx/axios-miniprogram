/*
 * @Author: early-autumn
 * @Date: 2020-04-13 15:22:22
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-15 20:21:13
 */
import { AxiosRequest, AxiosResponse } from '../types';
import processURL from '../helper/processURL';
import processData from '../helper/processData';
import request from './request';

/**
 * 转换请求配置
 *
 * @param config 请求配置
 */
function transformRequestConfig(config: AxiosRequest): void {
  const { url, params, data } = config;

  config.url = processURL(url, params);

  if (data !== undefined) {
    config.data = processData(data);
  }
}

/**
 * 触发请求
 *
 * @param config 请求配置
 */
export default function dispatchRequest(config: AxiosRequest): Promise<AxiosResponse> {
  transformRequestConfig(config);

  return request(config);
}
