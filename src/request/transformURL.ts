import { isPlainObject } from '../helpers/isTypes';
import { buildURL } from '../helpers/buildURL';
import { combineURL } from '../helpers/combineURL';
import { dynamicURL } from '../helpers/dynamicURL';
import { AxiosRequestConfig } from '../core/Axios';

export function transformURL(config: AxiosRequestConfig) {
  const data = isPlainObject(config.data) ? config.data : {};

  let url = config.url ?? '/';

  url = combineURL(config.baseURL ?? '', url);
  url = dynamicURL(url, config.params, data);
  url = buildURL(url, config.params, config.paramsSerializer);

  return url;
}
