const combineRE = /(^|[^:])\/{2,}/g;
const removeRE = /\/$/;
export function combineURL(baseURL: string, url: string): string {
  return `${baseURL}/${url}`.replace(combineRE, '$1/').replace(removeRE, '');
}
