import { isPlainObject } from '../helpers/isTypes';
import { ignore } from '../helpers/ignore';
import { AxiosRequestConfig, AxiosRequestHeaders } from './Axios';

export function flattenHeaders(
  config: AxiosRequestConfig,
): AxiosRequestHeaders {
  if (!isPlainObject(config.headers)) {
    return {};
  }

  return {
    ...(config.headers.common ?? {}),
    ...(config.headers[config.method!.toLowerCase()] ?? {}),
    ...ignore(
      config.headers,
      'common',
      'options',
      'get',
      'head',
      'post',
      'put',
      'patch',
      'delete',
      'trace',
      'connect',
    ),
  };
}
