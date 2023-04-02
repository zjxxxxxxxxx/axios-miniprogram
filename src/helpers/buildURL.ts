import { isArray, isDate, isNull, isPlainObject, isUndefined } from './isTypes';

export function buildURL(
  url = '',
  params?: AnyObject,
  paramsSerializer = defaultSerializer,
): string {
  const hashIndex = url.indexOf('#');
  if (hashIndex !== -1) {
    url = url.slice(0, hashIndex);
  }

  const paramsStr = paramsSerializer(params);
  if (paramsStr) {
    url = `${url}${url.indexOf('?') === -1 ? '?' : '&'}${paramsStr}`;
  }

  return url;
}

function defaultSerializer(params?: AnyObject): string {
  if (!isPlainObject(params)) return '';

  const parts: string[] = [];

  function push(key: string, value: string) {
    parts.push(`${encode(key)}=${encode(value)}`);
  }

  for (const [key, val] of Object.entries(params)) {
    if (!isNull(val) && !isUndefined(val) && val === val) {
      if (isPlainObject(val)) {
        for (const [k, v] of Object.entries(val)) push(`${key}[${k}]`, v);
      } else if (isArray<string>(val)) {
        const k = `${key}[]`;
        for (const v of val) push(k, v);
      } else if (isDate(val)) {
        push(key, val.toISOString());
      } else {
        push(key, val);
      }
    }
  }

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
