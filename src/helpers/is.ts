const _toString = Object.prototype.toString;

export function isDate(date: any): date is Date {
  return _toString.call(date) === '[object Date]';
}

export function isPlainObject<T = never>(
  value: any,
): value is [T] extends never[] ? AnyObject : T {
  return _toString.call(value) === '[object Object]';
}

export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNull(value: any): value is null {
  return value === null;
}

export function isFunction<T extends Function = Function>(
  value: any,
): value is T {
  return typeof value === 'function';
}

export function isArray<T = any>(value: any): value is T[] {
  return Array.isArray(value);
}

export function isEmptyArray<T = any>(value: any): value is [] {
  return isArray<T>(value) && value.length === 0;
}

export function isEmptyObject<T = any>(value: any): value is {} {
  return isPlainObject<T>(value) && Object.keys(value).length === 0;
}
