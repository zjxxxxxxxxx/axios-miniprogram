import { buildURL } from '../helpers/buildURL';
import { combineURL } from '../helpers/combineURL';
import { interpolation, isDynamicURL } from '../helpers/dynamicURL';
import { isAbsoluteURL } from '../helpers/isAbsoluteURL';
import { AxiosRequestConfig } from './Axios';

export function transformURL(config: AxiosRequestConfig): string {
  let url = config.url ?? '';

  if (!isAbsoluteURL(url)) url = combineURL(config.baseURL ?? '', url);

  if (isDynamicURL(url))
    url = interpolation(url, Object.assign({}, config.params, config.data));

  url = buildURL(url, config.params, config.paramsSerializer);

  return url;
}
