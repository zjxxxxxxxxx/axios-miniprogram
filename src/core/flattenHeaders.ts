import { isPlainObject } from '../helpers/is';
import { omit } from '../helpers/utils';
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
