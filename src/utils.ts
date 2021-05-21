import { AxiosPlatform } from './core/adapter';
import { AxiosRequestParams } from './core/Axios';

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

export function isPlatform(value: any): value is AxiosPlatform {
  return (
    isPlainObject(value) &&
    isFunction(value.request) &&
    isFunction(value.upload) &&
    isFunction(value.download)
  );
}

export function deepMerge<T = any>(...objs: T[]): T {
  const result: AnyObject = {};

  objs.forEach((obj: AnyObject) =>
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      const resultVal = result[key];

      if (isPlainObject(resultVal) && isPlainObject(val)) {
        result[key] = deepMerge(resultVal, val);
      } else if (isPlainObject(val)) {
        result[key] = deepMerge(val);
      } else {
        result[key] = val;
      }
    }),
  );

  return result as T;
}

export function pick<T extends AnyObject, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> {
  const _pick: Partial<T> = {};

  keys.forEach((key: K) => (_pick[key] = obj[key]));

  return _pick as Pick<T, K>;
}

export function omit<T extends AnyObject, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const _omit = Object.assign({}, obj);

  keys.forEach((key: K) => delete _omit[key]);

  return _omit;
}

export function revisePlatformApiNames(platform: AnyObject): AxiosPlatform {
  return {
    request: platform.request ?? platform.httpRequest,
    upload: platform.upload ?? platform.uploadFile,
    download: platform.download ?? platform.downloadFile,
  };
}

export function assert(condition: boolean, msg: string) {
  if (!condition) {
    throwError(msg);
  }
}

export function throwError(msg: string): void {
  throw new Error(`[axios-miniprogram]:${msg}`);
}

function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

function generateURL(url: string, serializedParams: string): string {
  const hashIndex = url.indexOf('#');

  if (hashIndex !== -1) {
    url = url.slice(0, hashIndex);
  }

  if (serializedParams === '') {
    return url;
  }

  const prefix = url.indexOf('?') === -1 ? '?' : '&';

  serializedParams = `${prefix}${serializedParams}`;

  return `${url}${serializedParams}`;
}

function paramsSerialization(params?: AxiosRequestParams): string {
  if (!isPlainObject(params)) {
    return '';
  }

  const parts: string[] = [];

  Object.keys(params).forEach((key): void => {
    const value = params[key];

    if (isNull(value) || isUndefined(value) || value !== value) {
      return;
    }

    if (Array.isArray(value)) {
      key += '[]';
    }

    const values = [].concat(value);

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

export function buildURL(
  url = '',
  params?: AxiosRequestParams,
  paramsSerializer = paramsSerialization,
): string {
  if (!isPlainObject(params)) {
    return url;
  }

  return generateURL(url, paramsSerializer(params));
}

const combineREG = /\/{2,}/g;
export function combineURL(baseURL = '', url: string): string {
  const separator = '/';

  return `${baseURL}${separator}${url}`.replace(combineREG, separator);
}

const dynamicREG = /\/?(:([a-zA-Z_$][\w-$]*))\/??/g;
export function dynamicURL(url: string, params?: AxiosRequestParams): string {
  if (!isPlainObject(params)) {
    return url;
  }

  return url.replace(dynamicREG, (key1, key2, key3) =>
    key1.replace(key2, params[key3]),
  );
}

const absoluteREG = /^([a-z][a-z\d+\-.]*:)?\/\//i;
export function isAbsoluteURL(url: string): boolean {
  return absoluteREG.test(url);
}
