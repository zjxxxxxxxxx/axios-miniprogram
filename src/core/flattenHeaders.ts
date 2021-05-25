import { isPlainObject } from '../helpers/is';
import { omit } from '../helpers/utils';
import {
  AxiosRequestConfig,
  AxiosRequestMethodAlias,
  AxiosRequestHeaders,
} from './Axios';

export function flattenHeaders(
  config: AxiosRequestConfig,
): AxiosRequestHeaders | undefined {
  if (!isPlainObject(config.headers)) {
    return;
  }

  const common = 'common';
  const method = config.method?.toLowerCase() ?? 'get';
  const alias: AxiosRequestMethodAlias[] = [
    'options',
    'get',
    'head',
    'post',
    'put',
    'delete',
    'trace',
    'connect',
  ];

  return Object.assign(
    {},
    config.headers[common],
    config.headers[method],
    omit(config.headers, common, ...alias),
  );
}
