import { AxiosRequestConfig } from '../core/Axios';
import { isPlainObject } from './types';
import { buildURL } from './buildURL';
import { combineURL } from './combineURL';
import { dynamicURL } from './dynamicURL';

export function transformURL(config: AxiosRequestConfig) {
  const fullPath = dynamicURL(
    combineURL(config.baseURL, config.url),
    config.params,
    isPlainObject(config.data) ? config.data : {},
  );
  return buildURL(fullPath, config.params, config.paramsSerializer);
}
