/*
 * @Author: early-autumn
 * @Date: 2020-04-15 22:48:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-18 14:56:44
 */
import { AxiosRequestConfig } from '../types';
import { isPlainObject, deepMerge } from './utils';

/**
 * 只取 config1 中的配置
 *
 * @param keys
 * @param config
 * @param config1
 */
function onlyFromConfig1(keys: ['adapter'], config: AxiosRequestConfig, config1: AxiosRequestConfig) {
  keys.forEach((key) => {
    if (config1[key] !== undefined) {
      config[key] = config1[key] as any;
    }
  });
}

/**
 * 只取 config2 中的配置
 *
 * @param keys
 * @param config
 * @param config2
 */
function onlyFromConfig2(keys: ['url', 'data'], config: AxiosRequestConfig, config2: AxiosRequestConfig) {
  keys.forEach((key) => {
    if (config2[key] !== undefined) {
      config[key] = config2[key] as any;
    }
  });
}

/**
 * 优先取 config2 中的配置
 *
 * @param keys
 * @param config
 * @param config1
 * @param config2
 */
function priorityFromConfig2(
  keys: [
    'baseURL',
    'method',
    'validateStatus',
    'paramsSerializer',
    'transformRequest',
    'transformResponse',
    'cancelToken',
    'dataType',
    'responseType',
    'timeout',
    'enableHttp2',
    'enableQuic',
    'enableCache',
    'sslVerify'
  ],
  config: AxiosRequestConfig,
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
) {
  keys.forEach((key) => {
    if (config2[key] !== undefined) {
      config[key] = config2[key] as any;
    } else if (config1[key] !== undefined) {
      config[key] = config1[key] as any;
    }
  });
}

/**
 * 深度合并配置
 *
 * @param keys
 * @param config
 * @param config1
 * @param config2
 */
function deepMergeConfig(
  keys: ['headers', 'params'],
  config: AxiosRequestConfig,
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
) {
  keys.forEach((key) => {
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
}

/**
 * 合并 Axios 请求配置
 *
 * @param config1 Axios 请求配置1
 * @param config2 Axios 请求配置2
 */
export default function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig): AxiosRequestConfig {
  const config: AxiosRequestConfig = {};

  onlyFromConfig1(['adapter'], config, config1);
  onlyFromConfig2(['url', 'data'], config, config2);
  deepMergeConfig(['headers', 'params'], config, config1, config2);
  priorityFromConfig2(
    [
      'baseURL',
      'method',
      'validateStatus',
      'paramsSerializer',
      'transformRequest',
      'transformResponse',
      'cancelToken',
      'dataType',
      'responseType',
      'timeout',
      'enableHttp2',
      'enableQuic',
      'enableCache',
      'sslVerify',
    ],
    config,
    config1,
    config2
  );

  return config;
}
