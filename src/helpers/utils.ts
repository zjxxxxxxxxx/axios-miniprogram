import { isPlainObject, isString } from './is';

export function deepMerge<T = unknown>(...objs: T[]): T {
  const result: AnyObject = {};

  objs.forEach((obj: AnyObject) =>
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      const resultVal = result[key];

      if (isPlainObject(resultVal) && isPlainObject(val)) {
        result[key] = deepMerge(resultVal, val);
      } else if (isPlainObject(val)) {
        result[key] = deepMerge(val);
      } else {
        result[key] = val;
      }
    }),
  );

  return result as T;
}

export function pick<T extends AnyObject, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> {
  const _pick: Partial<T> = {};

  keys.forEach((key: K) => (_pick[key] = obj[key]));

  return _pick as Pick<T, K>;
}

export function omit<T extends AnyObject, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const _omit = Object.assign({}, obj);

  keys.forEach((key: K) => delete _omit[key]);

  return _omit;
}

export function assert(condition: boolean, msg: string) {
  if (!condition) {
    throwError(msg);
  }
}

export function throwError(msg: string): void {
  throw new Error(`[axios-miniprogram]: ${msg}`);
}

export function toLowerCase<T extends string>(value: unknown, defaultValue: T): T {
  if (!isString(value)) {
    value = defaultValue;
  }

  return value.toLowerCase() as T;
}

export function toUpperCase<T extends string>(value: unknown, defaultValue: T): T {
  if (!isString(value)) {
    value = defaultValue;
  }

  return value.toUpperCase() as T;
}
