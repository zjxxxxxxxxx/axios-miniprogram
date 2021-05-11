import { AnyObject, AxiosRequestConfig } from '../types';
import { isPlainObject, deepMerge } from '../helpers/utils';

type OnlyFromConfig2Key = 'url' | 'data';
type PriorityFromConfig2Key =
  | 'adapter'
  | 'baseURL'
  | 'method'
  | 'validateStatus'
  | 'paramsSerializer'
  | 'transformRequest'
  | 'transformResponse'
  | 'errorHandler'
  | 'cancelToken'
  | 'dataType'
  | 'responseType'
  | 'timeout'
  | 'enableHttp2'
  | 'enableQuic'
  | 'enableCache'
  | 'sslVerify';
type DeepMergeConfigKey = 'params' | 'headers';

/**
 * 只取 config2 中的配置
 *
 * @param keys
 * @param config
 * @param config2
 */
function onlyFromConfig2(
  keys: OnlyFromConfig2Key[],
  config: AxiosRequestConfig,
  config2: AxiosRequestConfig
) {
  keys.forEach((key) => {
    if (config2[key] !== void 0) {
      config[key] = config2[key] as any;
    }
  });
}

/**
 * 优先取 config2 中的配置, config2 中没有就取 config1
 *
 * @param keys
 * @param config
 * @param config1
 * @param config2
 */
function priorityFromConfig2(
  keys: PriorityFromConfig2Key[],
  config: AxiosRequestConfig,
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
) {
  keys.forEach((key) => {
    if (config2[key] !== void 0) {
      config[key] = config2[key] as any;
    } else if (config1[key] !== void 0) {
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
  keys: DeepMergeConfigKey[],
  config: AxiosRequestConfig,
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
) {
  keys.forEach((key) => {
    if (isPlainObject(config2[key])) {
      config[key] = deepMerge<AnyObject>(config1[key] ?? {}, config2[key] as AnyObject);
    } else if (isPlainObject(config1[key])) {
      config[key] = deepMerge<AnyObject>(config1[key] as AnyObject);
    }
  });
}

/**
 * 合并 Axios 请求配置
 *
 * @param config1 Axios 请求配置1
 * @param config2 Axios 请求配置2
 */
export default function mergeConfig(
  config1: AxiosRequestConfig = {},
  config2: AxiosRequestConfig = {}
): AxiosRequestConfig {
  const config: AxiosRequestConfig = {};
  const onlyFromConfig2Keys: OnlyFromConfig2Key[] = ['url', 'data'];
  const priorityFromConfig2Keys: PriorityFromConfig2Key[] = [
    'adapter',
    'baseURL',
    'method',
    'validateStatus',
    'paramsSerializer',
    'transformRequest',
    'transformResponse',
    'errorHandler',
    'cancelToken',
    'dataType',
    'responseType',
    'timeout',
    'enableHttp2',
    'enableQuic',
    'enableCache',
    'sslVerify',
  ];
  const deepMergeConfigKeys: DeepMergeConfigKey[] = ['headers', 'params'];

  onlyFromConfig2(onlyFromConfig2Keys, config, config2);
  priorityFromConfig2(priorityFromConfig2Keys, config, config1, config2);
  deepMergeConfig(deepMergeConfigKeys, config, config1, config2);

  return config;
}
