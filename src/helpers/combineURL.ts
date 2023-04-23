import { isAbsoluteURL } from './isAbsoluteURL';

const combineRE = /(^|[^:])\/{2,}/g;
const removeRE = /\/$/;
export function combineURL(baseURL = '', url = ''): string {
  if (isAbsoluteURL(url)) {
    return url;
  }
  return `${baseURL}/${url}`.replace(combineRE, '$1/').replace(removeRE, '');
}
