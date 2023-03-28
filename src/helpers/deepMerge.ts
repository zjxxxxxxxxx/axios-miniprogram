import { isPlainObject } from './isTypes';

export function deepMerge<T extends AnyObject>(...objs: T[]): T {
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
