const combineRE = /(^|[^:])\/{2,}/g;
export function combineURL(baseURL: string, url: string): string {
  return url ? `${baseURL}/${url}`.replace(combineRE, '$1/') : baseURL;
}
