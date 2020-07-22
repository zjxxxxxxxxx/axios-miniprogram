import { AliasMethod, AdapterMethod, Method } from '../types';

/**
 * 请求方法转全小写
 *
 * @param config Axios 请求配置
 */
export function methodToLowercase(method: Method = 'get'): AliasMethod {
  return method.toLowerCase() as AliasMethod;
}

/**
 * 请求方法转全大写
 *
 * @param config Axios 请求配置
 */
export function methodToUppercase(method: Method = 'GET'): AdapterMethod {
  return method.toUpperCase() as AdapterMethod;
}
