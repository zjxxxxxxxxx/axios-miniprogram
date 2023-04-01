const combineREG = /(^|[^:])\/{2,}/g;
export function combineURL(baseURL: string, url: string): string {
  return url ? `${baseURL}/${url}`.replace(combineREG, '$1/') : baseURL;
}
