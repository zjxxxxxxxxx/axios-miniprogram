const absoluteRE = /^([a-z][\w-.]*:)\/\//i;
export function isAbsoluteURL(url: string): boolean {
  return absoluteRE.test(url);
}
