import { isUndefined, isPlainObject } from '../helpers/isTypes';
import { deepMerge } from '../helpers/deepMerge';
import { AxiosRequestConfig } from './Axios';

type AxiosRequestConfigKey = keyof AxiosRequestConfig;

const onlyFromConfig2Keys: AxiosRequestConfigKey[] = [
  'url',
  'method',
  'data',
  'upload',
  'download',
];
const priorityFromConfig2Keys: AxiosRequestConfigKey[] = [
  'adapter',
  'baseURL',
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

  for (const key of onlyFromConfig2Keys) {
    const value = config2[key];

    if (!isUndefined(value)) {
      config[key] = value as any;
    }
  }

  for (const key of priorityFromConfig2Keys) {
    const value1 = config1[key];
    const value2 = config2[key];

    if (!isUndefined(value2)) {
      config[key] = value2 as any;
    } else if (!isUndefined(value1)) {
      config[key] = value1 as any;
    }
  }

  for (const key of deepMergeConfigKeys) {
    const value1 = config1[key];
    const value2 = config2[key];

    if (isPlainObject(value2)) {
      config[key] = deepMerge(value1 ?? {}, value2) as any;
    } else if (isPlainObject(value1)) {
      config[key] = deepMerge(value1) as any;
    }
  }

  return config;
}
