/*
 * @Author: early-autumn
 * @Date: 2020-04-13 21:55:40
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-19 16:08:40
 */
import { AnyObject } from '../types';

const _toString = Object.prototype.toString;

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
 * 检查是否是一个绝对 URL
 *
 * xxx:// 或者 "//" 开头,  视为绝对地址
 *
 * @param url 需要检查的 URL
 */
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

/**
 * 拼接 baseURL 和 url 获得完整的 URL
 *
 * combineURL('1/2///','////3/4') => '1/2/3/4'
 */
export function combineURL(baseURL: string, url: string): string {
  return `${baseURL.replace(/\/*$/, '')}/${url.replace(/^\/*/, '')}`;
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

  objs.forEach((obj: Record<string, any>): void => {
    if (obj === undefined) {
      return;
    }
    Object.entries(obj).forEach(([key, value]) => assignValue(key, value));
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

  keys.forEach((key: K) => (_pick[key] = obj[key]));

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

  keys.forEach((key: K) => delete _omit[key]);

  return _omit;
}
