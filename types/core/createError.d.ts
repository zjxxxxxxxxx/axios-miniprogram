import { AxiosRequestConfig, RequestConfig, AxiosResponse, AxiosError } from '../types';
/**
 * 创建 AxiosError 的工厂方法
 *
 * 返回一个新的 AxiosError 对象
 *
 * @param message  错误信息
 * @param config   Axios 请求配置
 * @param request  通用请求配置
 * @param response Axios 响应体
 */
export default function createError(message: string, config: AxiosRequestConfig, request: RequestConfig, response?: AxiosResponse): AxiosError;
