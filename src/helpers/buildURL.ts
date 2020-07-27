import { AnyObject, Params } from '../types';
import { encode, isPlainObject, isDate } from './utils';

/**
 * 通过请求地址和序列化参数生成新的请求地址
 *
 * @param url              请求地址
 * @param serializedParams 序列化参数
 */
function generateURL(url: string, serializedParams: string): string {
  // 移除 hash
  const hashIndex = url.indexOf('#');

  if (hashIndex !== -1) {
    url = url.slice(0, hashIndex);
  }

  if (serializedParams === '') {
    return url;
  }

  // 拼接前缀
  const prefix = url.indexOf('?') === -1 ? '?' : '&';

  serializedParams = `${prefix}${serializedParams}`;

  return `${url}${serializedParams}`;
}

/**
 * 默认参数序列化
 *
 * @param params 请求参数
 */
function paramsSerialization(params: AnyObject): string {
  const parts: string[] = [];

  Object.entries(params).forEach(function encodeKeyValue([key, value]): void {
    if (value === null || value === void 0 || value !== value) {
      return;
    }

    // 如果值是一个数组, 则特殊处理 key
    if (Array.isArray(value)) {
      key += '[]';
    }

    // 转成数组统一处理
    const values: any[] = [].concat(value);

    values.forEach((val: any): void => {
      if (isPlainObject(val)) {
        val = JSON.stringify(val);
      } else if (isDate(val)) {
        val = val.toISOString();
      }

      parts.push(`${encode(key)}=${encode(val)}`);
    });
  });

  return parts.join('&');
}

/**
 * 处理 URL 参数
 *
 * @param url              请求地址
 * @param params           请求参数
 * @param paramsSerializer 自定义参数序列化
 */
export default function buildURL(
  url: string,
  params: Params = {},
  paramsSerializer = paramsSerialization
): string {
  return generateURL(url, paramsSerializer(params));
}
