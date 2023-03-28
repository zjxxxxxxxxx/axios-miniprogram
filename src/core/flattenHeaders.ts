import { isPlainObject } from '../helpers/isTypes';
import { omit } from '../helpers/omit';
import { AxiosRequestConfig, AxiosRequestHeaders } from './Axios';

export function flattenHeaders(
  config: AxiosRequestConfig,
): AxiosRequestHeaders | undefined {
  if (!isPlainObject(config.headers)) {
    return config.headers;
  }

  return {
    ...(config.headers.common ?? {}),
    ...(config.headers[config.method!.toLowerCase()] ?? {}),
    ...omit(
      config.headers,
      'common',
      'options',
      'get',
      'head',
      'post',
      'put',
      'delete',
      'trace',
      'connect',
    ),
  };
}
