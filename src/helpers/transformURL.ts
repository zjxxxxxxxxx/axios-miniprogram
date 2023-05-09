import { AxiosRequestConfig } from '../core/Axios';
import { buildURL } from './buildURL';
import { combineURL } from './combineURL';

export function transformURL(config: AxiosRequestConfig) {
  const fullPath = combineURL(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
}
