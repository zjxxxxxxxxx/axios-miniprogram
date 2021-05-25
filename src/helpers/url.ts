import { isDate, isNull, isPlainObject, isUndefined } from './is';

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

function paramsSerialization(params?: any): string {
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
        val = (val as Date).toISOString();
      }

      parts.push(`${encode(key)}=${encode(val)}`);
    });
  });

  return parts.join('&');
}

export function buildURL(
  url = '',
  params?: any,
  paramsSerializer = paramsSerialization,
): string {
  if (!isPlainObject(params)) {
    return url;
  }

  return generateURL(url, paramsSerializer(params));
}

export const combineREG = /(?<!:)\/{2,}/g;
export function combineURL(baseURL = '', url: string): string {
  const separator = '/';

  return `${baseURL}${separator}${url}`.replace(combineREG, separator);
}

export const dynamicREG = /\/?(:([a-zA-Z_$][\w-$]*))\/??/g;
export function isDynamicURL(url: string): boolean {
  return dynamicREG.test(url);
}
export function dynamicInterpolation(url: string, sourceData?: any): string {
  if (!isPlainObject(sourceData)) {
    return url;
  }

  return url.replace(dynamicREG, (key1, key2, key3) =>
    key1.replace(key2, sourceData[key3]),
  );
}

export const absoluteREG = /^([a-z][a-z\d+\-.]*:)?\/\//i;
export function isAbsoluteURL(url: string): boolean {
  return absoluteREG.test(url);
}
