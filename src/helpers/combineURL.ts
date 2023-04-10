const combineRE = /(^|[^:])\/{2,}/g;
const removeRE = /\/$/;
export function combineURL(baseURL = '', url = ''): string {
  return `${baseURL}/${url}`.replace(combineRE, '$1/').replace(removeRE, '');
}
