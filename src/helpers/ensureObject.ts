import { isPlainObject } from './types';

export function ensureObject(value?: any) {
  return isPlainObject(value) ? value : {};
}
