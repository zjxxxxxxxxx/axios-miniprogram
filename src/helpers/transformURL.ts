import { AxiosRequestConfig } from '../core/Axios';
import { isPlainObject } from './isTypes';
import { buildURL } from './buildURL';
import { combineURL } from './combineURL';
import { dynamicURL } from './dynamicURL';

export function transformURL(config: AxiosRequestConfig) {
  let url = combineURL(config.baseURL, config.url);
  url = dynamicURL(
    url,
    config.params,
    isPlainObject(config.data) ? config.data : {},
  );
  url = buildURL(url, config.params, config.paramsSerializer);
  return url;
}
