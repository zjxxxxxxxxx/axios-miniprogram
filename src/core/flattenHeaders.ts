import { Headers, AxiosRequestConfig } from '../types';
import { omit } from '../helpers/utils';
import { methodToLowercase } from './transformMethod';

/**
 * 拉平请求头
 *
 * @param config Axios 请求配置
 */
export default function flattenHeaders(config: AxiosRequestConfig): Headers {
  const { headers } = config;

  if (headers === void 0) {
    return {};
  }

  const method = methodToLowercase(config.method);

  return {
    ...(headers.common ?? {}),
    ...(headers[method] ?? {}),
    ...omit(
      headers,
      'common',
      'options',
      'get',
      'head',
      'post',
      'put',
      'delete',
      'trace',
      'connect'
    ),
  };
}
