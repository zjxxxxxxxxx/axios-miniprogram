import { isAbsoluteURL } from './isAbsoluteURL';

export function combineURL(baseURL = '', url = ''): string {
  if (isAbsoluteURL(url)) {
    return url;
  }

  return url
    ? `${baseURL.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`
    : baseURL;
}
