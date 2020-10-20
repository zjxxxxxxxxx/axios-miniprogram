import { AnyObject, ObjectTree } from '../types';

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
 * 是否是 Date
 */
export function isDate(date: unknown): date is Date {
  return _toString.call(date) === '[object Date]';
}

/**
 * 是否是普通对象
 */
export function isPlainObject<T = never>(
  value: unknown
): value is [T] extends never[] ? AnyObject : T {
  return _toString.call(value) === '[object Object]';
}

/**
 * 是否是 undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

/**
 * 是否是字符型
 */
export function isString(value: unknown): value is number {
  return typeof value === 'string';
}

/**
 * 是否是 Null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * 深度合并多个对象
 *
 * @param objs n 个对象
 */
export function deepMerge<T = never>(...objs: ObjectTree[]): [T] extends never[] ? ObjectTree : T {
  const result: ObjectTree = {};

  function assignValue(key: string, val: unknown) {
    // 如果当前结果和当前值都为普通对象
    // 递归进行深度合并
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = deepMerge(result[key] as ObjectTree, val as ObjectTree);
    }
    // 如果只有当前值为普通对象
    // 直接深拷贝当前值
    else if (isPlainObject(val)) {
      result[key] = deepMerge({}, val as ObjectTree);
    }
    // 如果都不是普通对象
    // 直接赋值
    else {
      result[key] = val;
    }
  }

  objs.forEach(function assignObj(obj: ObjectTree): void {
    Object.entries(obj).forEach(function ([key, value]) {
      assignValue(key, value);
    });
  });

  return result as [T] extends never[] ? ObjectTree : T;
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
