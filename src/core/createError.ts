import { AxiosRequestConfig, RequestConfig, AxiosResponse, AxiosError } from '../types';

/**
 * AxiosError 继承自 Error
 */
class AxiosErrorClass extends Error implements AxiosError {
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
    Object.setPrototypeOf(this, AxiosErrorClass.prototype);
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
  return new AxiosErrorClass(message, config, request, response);
}
