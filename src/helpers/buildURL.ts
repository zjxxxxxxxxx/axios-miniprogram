import { isDate, isNull, isPlainObject, isUndefined } from './isTypes';

export function buildURL(
  url = '',
  params?: unknown,
  paramsSerializer = paramsSerialization,
): string {
  if (!isPlainObject(params)) {
    return url;
  }

  return generateURL(url, paramsSerializer(params));
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

function paramsSerialization(params?: AnyObject): string {
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
