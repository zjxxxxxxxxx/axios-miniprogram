const combineREG = /([^:])\/{2,}/g;
export function combineURL(baseURL = '', url: string): string {
  const separator = '/';
  const replaceStr = `$1${separator}`;

  return `${baseURL}${separator}${url}`.replace(combineREG, replaceStr);
}
