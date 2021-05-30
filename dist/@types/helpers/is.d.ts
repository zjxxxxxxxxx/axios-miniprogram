export declare function isArray<T = any>(value: any): value is T[];
export declare function isDate(date: any): date is Date;
export declare function isEmptyArray<T = any>(value: any): value is [];
export declare function isEmptyObject<T = any>(value: any): value is {};
export declare function isFunction<T extends Function = Function>(
  value: any,
): value is T;
export declare function isNull(value: any): value is null;
export declare function isPlainObject<T = never>(
  value: any,
): value is [T] extends never[] ? AnyObject : T;
export declare function isString(value: any): value is string;
export declare function isUndefined(value: any): value is undefined;
