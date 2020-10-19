import { AnyObject, Params } from '../types';
/**
 * 默认参数序列化
 *
 * @param params 请求参数
 */
declare function paramsSerialization(params: AnyObject): string;
/**
 * 处理 URL 参数
 *
 * @param url              请求地址
 * @param params           请求参数
 * @param paramsSerializer 自定义参数序列化
 */
export default function buildURL(url: string, params?: Params, paramsSerializer?: typeof paramsSerialization): string;
export {};
