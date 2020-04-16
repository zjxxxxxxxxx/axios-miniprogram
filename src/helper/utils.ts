/*
 * @Author: early-autumn
 * @Date: 2020-04-13 21:55:40
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-16 23:37:50
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
 * 浅合并多个对象
 *
 * @param objs n 个对象
 */
export function merge(...objs: Record<string, any>[]): Record<string, any> {
  const result: Record<string, any> = {};

  function assignValue(key: string, val: any): void {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  objs.forEach((obj: Record<string, any>): void => {
    Object.entries(obj).forEach(([key, value]) => assignValue(key, value));
  });

  return result;
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
    Object.entries(obj).forEach(([key, value]) => assignValue(key, value));
  });

  return result;
}
