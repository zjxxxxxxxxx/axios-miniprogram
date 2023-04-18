import { isPlainObject } from '../helpers/isTypes';
import { buildURL } from '../helpers/buildURL';
import { combineURL } from '../helpers/combineURL';
import { dynamicURL } from '../helpers/dynamicURL';
import { isAbsoluteURL } from '../helpers/isAbsoluteURL';
import { AxiosRequestConfig } from './Axios';

export function transformURL(config: AxiosRequestConfig) {
  let url = config.url ?? '';

  if (!isAbsoluteURL(url)) url = combineURL(config.baseURL ?? '', url);
  url = dynamicURL(
    url,
    config.params,
    isPlainObject(config.data) ? config.data : {},
  );
  url = buildURL(url, config.params, config.paramsSerializer);

  return url;
}
