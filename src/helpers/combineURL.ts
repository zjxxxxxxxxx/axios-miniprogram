import { isAbsoluteURL } from './isAbsoluteURL';

export function combineURL(baseURL = '', url = ''): string {
  if (!url) return baseURL;
  if (isAbsoluteURL(url)) return url;
  return `${baseURL.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
}
