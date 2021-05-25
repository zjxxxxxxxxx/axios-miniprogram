import { isUndefined, isPlainObject } from '../helpers/is';
import { deepMerge } from '../helpers/utils';
import { AxiosRequestConfig } from './Axios';

type AxiosRequestConfigKey = keyof AxiosRequestConfig;

function onlyFromConfig2(
  keys: AxiosRequestConfigKey[],
  target: AxiosRequestConfig,
  config2: AxiosRequestConfig,
) {
  keys.forEach((key) => {
    const value = config2[key];

    if (!isUndefined(value)) {
      target[key] = value as any;
    }
  });
}

function priorityFromConfig2(
  keys: AxiosRequestConfigKey[],
  target: AxiosRequestConfig,
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig,
) {
  keys.forEach((key) => {
    const value1 = config1[key];
    const value2 = config2[key];

    if (!isUndefined(value2)) {
      target[key] = value2 as any;
    } else if (!isUndefined(value1)) {
      target[key] = value1 as any;
    }
  });
}

function deepMergeConfig(
  keys: AxiosRequestConfigKey[],
  target: AxiosRequestConfig,
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig,
) {
  keys.forEach((key) => {
    const value1 = config1[key];
    const value2 = config2[key];

    if (isPlainObject(value2)) {
      target[key] = deepMerge(value1 ?? {}, value2) as any;
    } else if (isPlainObject(value1)) {
      target[key] = deepMerge(value1) as any;
    }
  });
}

const onlyFromConfig2Keys: AxiosRequestConfigKey[] = ['url', 'method', 'data'];
const priorityFromConfig2Keys: AxiosRequestConfigKey[] = [
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
  'validateStatus',
  'onUploadProgress',
  'onDownloadProgress',
];
const deepMergeConfigKeys: AxiosRequestConfigKey[] = ['headers', 'params'];

export function mergeConfig(
  config1: AxiosRequestConfig = {},
  config2: AxiosRequestConfig = {},
): AxiosRequestConfig {
  const config: AxiosRequestConfig = {};

  onlyFromConfig2(onlyFromConfig2Keys, config, config2);
  priorityFromConfig2(priorityFromConfig2Keys, config, config1, config2);
  deepMergeConfig(deepMergeConfigKeys, config, config1, config2);

  return config;
}
