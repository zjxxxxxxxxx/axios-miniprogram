export function omit<T extends AnyObject, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const res = { ...obj };
  keys.forEach((key: K) => delete res[key]);
  return res;
}
