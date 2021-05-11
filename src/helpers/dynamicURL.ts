import { Params } from '../types';
import { isPlainObject } from './utils';

const dynamicREG = /\/?(:([a-zA-Z_$][\w-$]?))\/??/g;

export default function dynamicURL(url: string, params?: Params): string {
  if (!isPlainObject(params)) {
    return url;
  }

  return url.replace(dynamicREG, (key1, key2, key3) =>
    key1.replace(key2, params[key3]),
  );
}
