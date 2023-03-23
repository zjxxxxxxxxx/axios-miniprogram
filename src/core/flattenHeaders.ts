import { isPlainObject } from '../helpers/is';
import { omit, toLowerCase } from '../helpers/utils';
import {
  AxiosRequestConfig,
  AxiosRequestMethodAlias,
  AxiosRequestHeaders,
} from './Axios';

export function flattenHeaders(
  config: AxiosRequestConfig,
): AxiosRequestHeaders | undefined {
  if (!isPlainObject(config.headers)) {
    return config.headers;
  }

  return {
    ...(config.headers.common ?? {}),
    ...(config.headers[
      toLowerCase<AxiosRequestMethodAlias>(config.method, 'get')
    ] ?? {}),
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
