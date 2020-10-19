import { AxiosRequestConfig, AxiosResponse } from '../types';
/**
 * 发送请求
 *
 * @param config Axios 请求配置
 */
export default function dispatchRequest(config: AxiosRequestConfig): Promise<AxiosResponse>;
