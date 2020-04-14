/*
 * @Author: early-autumn
 * @Date: 2020-04-14 10:15:50
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 23:09:27
 */
import { AxiosRequestConfig } from '../types';
import processURL from '../helper/processURL';
import processData from '../helper/processData';

/**
 * 处理 config
 *
 * @param config AxiosRequestConfig
 */
export default function transformRequestConfig(config: AxiosRequestConfig): void {
  const { url, params, data } = config;

  config.url = processURL(url, params);
  config.data = processData(data);
}
