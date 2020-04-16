/*
 * @Author: early-autumn
 * @Date: 2020-04-14 22:23:39
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-16 20:17:51
 */
import { AxiosRequestConfig, AxiosResponse } from '../types';

/**
 * AxiosError 继承自 Error
 */
class AxiosError extends Error {
  /**
   * 是 Axios 错误
   */
  isAxiosError: boolean;

  /**
   * 请求配置
   */
  config: AxiosRequestConfig;

  /**
   * 请求响应体
   */
  response?: AxiosResponse;

  constructor(message: string, config: AxiosRequestConfig, response?: AxiosResponse) {
    super(message);

    this.isAxiosError = true;
    this.config = config;
    this.response = response;

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
 * @param config   请求配置
 * @param response 请求响应体
 */
export default function createError(message: string, config: AxiosRequestConfig, response?: AxiosResponse): AxiosError {
  return new AxiosError(message, config, response);
}
