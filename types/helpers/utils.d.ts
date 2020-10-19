import { AnyObject } from '../types';
/**
 * 对字符串进行编码转换
 *
 * @param str 字符串
 */
export declare function encode(str: string): string;
/**
 * 是不是一个日期对象
 *
 * @param date 判断目标
 */
export declare function isDate(date: unknown): date is Date;
/**
 * 是不是一个普通对象
 *
 * @param obj 判断目标
 */
export declare function isPlainObject(obj: unknown): obj is Record<string, unknown>;
/**
 * 深度合并多个对象
 *
 * @param objs n 个对象
 */
export declare function deepMerge(...objs: Record<string, any>[]): Record<string, any>;
/**
 * 从对象中提取一部分属性
 *
 * @param obj  源对象
 * @param keys 需要提取的 key
 */
export declare function pick<T extends AnyObject, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;
/**
 * 从对象中剔除一部分属性
 *
 * @param obj  源对象
 * @param keys 需要剔除的 key
 */
export declare function omit<T extends AnyObject, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K>;
