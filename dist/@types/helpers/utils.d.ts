export declare function deepMerge<T = any>(...objs: T[]): T;
export declare function pick<T extends AnyObject, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K>;
export declare function omit<T extends AnyObject, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K>;
export declare function assert(condition: boolean, msg: string): void;
export declare function throwError(msg: string): void;
export declare function toLowerCase<T extends string>(
  value: any,
  defaultValue: T,
): T;
export declare function toUpperCase<T extends string>(
  value: any,
  defaultValue: T,
): T;
