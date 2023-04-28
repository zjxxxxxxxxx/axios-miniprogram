import {
  PLAIN_METHODS,
  WITH_DATA_METHODS,
  WITH_PARAMS_METHODS,
} from '../constants/methods';
import { deepMerge } from '../helpers/deepMerge';
import { ignore } from '../helpers/ignore';
import { AxiosRequestConfig, AxiosRequestHeaders } from '../core/Axios';

/**
 * 通用请求头键
 */
const commonKey = 'common';
/**
 * 需要忽略的键
 */
const ignoreKeys = [commonKey].concat(
  PLAIN_METHODS,
  WITH_PARAMS_METHODS,
  WITH_DATA_METHODS,
);

export function flattenHeaders(
  config: AxiosRequestConfig,
): AxiosRequestHeaders {
  const headers = config.headers ?? {};
  const mergedHeaders = deepMerge(
    headers[commonKey],
    headers[config.method!],
    headers,
  );
  return ignore(mergedHeaders, ...ignoreKeys);
}
