/*
 * @Author: early-autumn
 * @Date: 2020-04-15 22:48:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 11:14:54
 */
import { AxiosRequestConfig } from '../types';
import { isPlainObject, deepMerge } from './utils';

/**
 * 合并配置
 *
 * @param config1 配置 1
 * @param config2 配置 2
 */
export default function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig): AxiosRequestConfig {
  const config: AxiosRequestConfig = {};

  const keys1: ['url', 'data'] = ['url', 'data'];
  const keys2: ['headers', 'params'] = ['headers', 'params'];
  const keys3: [
    'adapter',
    'baseURL',
    'method',
    'dataType',
    'responseType',
    'timeout',
    'enableHttp2',
    'enableQuic',
    'enableCache',
    'cancelToken'
  ] = [
    'adapter',
    'baseURL',
    'method',
    'dataType',
    'responseType',
    'timeout',
    'enableHttp2',
    'enableQuic',
    'enableCache',
    'cancelToken',
  ];

  // 只取 config2 中的值
  keys1.forEach((key) => {
    if (config2[key] !== undefined) {
      config[key] = config2[key] as any;
    }
  });

  // 深度合并
  keys2.forEach((key) => {
    if (isPlainObject(config2[key])) {
      config[key] = deepMerge(config1[key] as any, config2[key] as any);
    } else if (config2[key] !== undefined) {
      config[key] = config2[key];
    } else if (isPlainObject(config1[key])) {
      config[key] = deepMerge(config1[key] as any);
    } else if (config1[key] !== undefined) {
      config[key] = config1[key];
    }
  });

  // 优先取 config2 中的配置
  keys3.forEach((key) => {
    if (config2[key] !== undefined) {
      config[key] = config2[key] as any;
    } else if (config1[key] !== undefined) {
      config[key] = config1[key] as any;
    }
  });

  return config;
}
