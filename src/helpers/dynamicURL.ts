const dynamicRE = /\/:([^/]+)/g;
export function dynamicURL(
  url: string,
  params: AnyObject = {},
  data: AnyObject = {},
) {
  return url.replace(dynamicRE, (_, $2) => {
    const value = params[$2] ?? data[$2];
    if ($2 in params) {
      delete params[$2];
    }
    return `/${value}`;
  });
}
