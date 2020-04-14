/*
 * @Author: early-autumn
 * @Date: 2020-04-13 21:55:40
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 14:28:31
 */
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

// export function isObject(value: any): value is object {
//   return value !== null && typeof value === 'object';
// }
