/*
 * @Author: early-autumn
 * @Date: 2020-04-13 21:55:40
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-23 22:38:30
 */
import { AnyObject } from '../types';

const _toString = Object.prototype.toString;

/**
 * 对字符串进行编码转换
 *
 * @param str 字符串
 */
export function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

/**
 * 是不是一个日期对象
 *
 * @param date 判断目标
 */
export function isDate(date: any): date is Date {
  return _toString.call(date) === '[object Date]';
}

/**
 * 是不是一个普通对象
 *
 * @param obj 判断目标
 */
export function isPlainObject(obj: any): obj is object {
  return _toString.call(obj) === '[object Object]';
}

/**
 * 深度合并多个对象
 *
 * @param objs n 个对象
 */
export function deepMerge(...objs: Record<string, any>[]): Record<string, any> {
  const result: Record<string, any> = {};

  function assignValue(key: string, val: any) {
    // 如果当前结果和当前值都为普通对象
    // 递归进行深度合并
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = deepMerge(result[key], val);
    }
    // 如果只有当前值为普通对象
    // 直接深拷贝当前值
    else if (isPlainObject(val)) {
      result[key] = deepMerge({}, val);
    }
    // 如果都不是普通对象
    // 直接赋值
    else {
      result[key] = val;
    }
  }

  objs.forEach(function assignObj(obj: Record<string, any>): void {
    Object.entries(obj).forEach(function assignKey([key, value]) {
      assignValue(key, value);
    });
  });

  return result;
}

/**
 * 从对象中提取一部分属性
 *
 * @param obj  源对象
 * @param keys 需要提取的 key
 */
export function pick<T extends AnyObject, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const _pick: Partial<T> = {};

  keys.forEach(function pickKey(key: K) {
    _pick[key] = obj[key];
  });

  return _pick as Pick<T, K>;
}

/**
 * 从对象中剔除一部分属性
 *
 * @param obj  源对象
 * @param keys 需要剔除的 key
 */
export function omit<T extends AnyObject, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const _omit = { ...obj };

  keys.forEach(function omitKey(key: K) {
    delete _omit[key];
  });

  return _omit;
}
