import { AxiosRequestData } from '../core/Axios';
import { ensureObject } from './ensureObject';

const dynamicRE = /\/:([^/?]+)/g;
export function dynamicURL(
  url: string,
  params: AnyObject = {},
  data: AxiosRequestData = {},
) {
  const dataObject = ensureObject(data);
  return url.replace(dynamicRE, (_, $2) => {
    const value = params[$2] ?? dataObject[$2];
    if ($2 in params) {
      delete params[$2];
    }
    return `/${value}`;
  });
}
