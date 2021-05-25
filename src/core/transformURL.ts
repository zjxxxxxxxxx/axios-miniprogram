import {
  buildURL,
  combineURL,
  dynamicInterpolation,
  isAbsoluteURL,
  isDynamicURL,
} from '../helpers/url';
import { AxiosRequestConfig } from './Axios';

export function transformURL(config: AxiosRequestConfig): string {
  let url = config.url ?? '';

  if (!isAbsoluteURL(url)) {
    url = combineURL(config.baseURL, url);
  }

  if (isDynamicURL(url)) {
    const sourceData = Object.assign({}, config.params, config.data);
    url = dynamicInterpolation(url, sourceData);
  }

  url = buildURL(url, config.params, config.paramsSerializer);

  return url;
}
