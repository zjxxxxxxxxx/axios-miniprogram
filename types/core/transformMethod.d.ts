import { AliasMethod, AdapterMethod, Method } from '../types';
/**
 * 请求方法转全小写
 *
 * @param config Axios 请求配置
 */
export declare function methodToLowercase(method?: Method): AliasMethod;
/**
 * 请求方法转全大写
 *
 * @param config Axios 请求配置
 */
export declare function methodToUppercase(method?: Method): AdapterMethod;
