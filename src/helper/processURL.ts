/*
 * @Author: early-autumn
 * @Date: 2020-04-13 21:45:45
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 23:54:41
 */
import { AnyObject, Params } from '../types';
import { isPlainObject, isDate } from './utils';

/**
 * 对字符串进行编码转换
 *
 * @param str 字符串
 */
function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

/**
 * 拼接 URL 和 序列化参数
 *
 * @param url              请求地址
 * @param serializedParams 序列化参数
 */
function joinURL(url: string, serializedParams: string): string {
  if (serializedParams === '') {
    return url;
  }

  // 移除 hash
  const hashIndex = serializedParams.indexOf('#');
  if (hashIndex !== -1) {
    serializedParams = serializedParams.slice(0, hashIndex);
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
function paramsSerializerDefault(params: AnyObject): string {
  const parts: string[] = [];

  Object.entries(params).forEach(([key, value]): void => {
    if (value === null || value === undefined || value !== value) {
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
export default function processURL(
  url: string,
  params?: Params,
  paramsSerializer?: (params: AnyObject) => string
): string {
  if (params === undefined) {
    return url;
  }

  let serializedParams = '';

  if (paramsSerializer !== undefined) {
    serializedParams = paramsSerializer(params);
  } else {
    serializedParams = paramsSerializerDefault(params);
  }

  return joinURL(url, serializedParams);
}
