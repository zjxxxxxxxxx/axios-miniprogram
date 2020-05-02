/*
 * @Author: early-autumn
 * @Date: 2020-04-14 22:23:39
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-25 09:23:40
 */
import { AxiosRequestConfig, RequestConfig, AxiosResponse } from '../types';

/**
 * AxiosError 继承自 Error
 */
class AxiosError extends Error {
  /**
   * 是 Axios 错误
   */
  public isAxiosError = true;

  /**
   * @param message  错误信息
   * @param config   Axios 请求配置
   * @param request  通用请求配置
   * @param response Axios 响应体
   */
  public constructor(
    message: string,
    public config: AxiosRequestConfig,
    public request: RequestConfig,
    public response?: AxiosResponse
  ) {
    super(message);

    // 修复继承系统自带类 prototype 设置失败的问题
    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

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
export default function createError(
  message: string,
  config: AxiosRequestConfig,
  request: RequestConfig,
  response?: AxiosResponse
): AxiosError {
  return new AxiosError(message, config, request, response);
}
