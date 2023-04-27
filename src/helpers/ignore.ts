/**
 * 忽略键值对
 *
 * @param obj 源对象
 * @param keys 忽略的键
 */
export function ignore<T extends AnyObject, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const res = { ...obj };
  origIgnore(res, keys);
  return res;
}

/**
 * 从源对象删除键值对
 *
 * @param obj 源对象
 * @param keys 忽略的键
 */
export function origIgnore(obj: AnyObject, keys: PropertyKey[]) {
  for (const key of keys) {
    delete obj[key as string | number];
  }
}
