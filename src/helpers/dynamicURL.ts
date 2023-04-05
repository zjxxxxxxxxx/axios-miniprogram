const dynamicRE = /\/:([^/]+)/g;
export function dynamicURL(url: string, data: AnyObject = {}): string {
  return url.replace(dynamicRE, (_, $2) => `/${data[$2]}`);
}
