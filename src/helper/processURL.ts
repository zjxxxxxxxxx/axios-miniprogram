/*
 * @Author: early-autumn
 * @Date: 2020-04-13 21:45:45
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 23:07:28
 */
import { Params } from '../types';
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
 * 拼接 URL 和 参数
 *
 * @param url    URL
 * @param params 参数
 */
function joinURL(url: string, paramsStr: string): string {
  // 移除 hash
  const hashIndex = paramsStr.indexOf('#');
  if (hashIndex !== -1) {
    paramsStr = paramsStr.slice(0, hashIndex);
  }

  // 拼接前缀
  const prefix = url.indexOf('?') === -1 ? '?' : '&';
  paramsStr = `${prefix}${paramsStr}`;

  return `${url}${paramsStr}`;
}

/**
 * 处理 URL 参数
 *
 * @param url    URL
 * @param params 参数
 */
export default function processURL(url: string, params?: Params): string {
  if (params === undefined) {
    return url;
  }

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

  if (parts.length !== 0) {
    url = joinURL(url, parts.join('&'));
  }

  return url;
}
