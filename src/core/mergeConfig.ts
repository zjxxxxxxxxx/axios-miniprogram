/*
 * @Author: early-autumn
 * @Date: 2020-04-15 22:48:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-16 00:18:44
 */
import { AxiosRequest, AxiosRequestDefault } from '../types';

/**
 * 合并默认配置和请求配置
 */
export default function mergeConfig(defaults: AxiosRequestDefault, config: AxiosRequest): AxiosRequest {
  console.log(defaults);
  return config;
}
