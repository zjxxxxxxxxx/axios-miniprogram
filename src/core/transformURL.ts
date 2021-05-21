import { buildURL, combineURL, dynamicURL, isAbsoluteURL } from '../utils';
import { AxiosRequestConfig } from './Axios';

export function transformURL(config: AxiosRequestConfig): string {
  let url = config.url ?? '';

  if (!isAbsoluteURL(url)) {
    url = combineURL(config.baseURL, url);
  }

  url = dynamicURL(url, config.params);
  url = buildURL(url, config.params, config.paramsSerializer);

  return url;
}
