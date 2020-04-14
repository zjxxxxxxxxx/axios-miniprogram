/*
 * @Author: early-autumn
 * @Date: 2020-04-14 22:23:39
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 22:55:33
 */
import { AxiosRequestConfig, AxiosResponse } from '../types';

class AxiosError extends Error {
  isAxiosError = true;
  config: AxiosRequestConfig;
  response?: AxiosResponse;

  constructor(message: string, config: AxiosRequestConfig, response?: AxiosResponse) {
    super(message);

    this.config = config;
    this.response = response;

    // 修复
    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export default function createError(message: string, config: AxiosRequestConfig, response?: AxiosResponse): AxiosError {
  return new AxiosError(message, config, response);
}
