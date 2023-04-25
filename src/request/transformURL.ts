import { isPlainObject } from '../helpers/isTypes';
import { buildURL } from '../helpers/buildURL';
import { combineURL } from '../helpers/combineURL';
import { dynamicURL } from '../helpers/dynamicURL';
import { AxiosRequestConfig } from '../core/Axios';

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
