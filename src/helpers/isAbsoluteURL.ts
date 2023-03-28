const absoluteREG = /^([a-z][a-z\d+\-.]*:)?\/\//i;
export function isAbsoluteURL(url: string): boolean {
  return absoluteREG.test(url);
}
