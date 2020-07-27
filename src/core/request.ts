import { AxiosRequestConfig, AxiosResponse, Response } from '../types';
import transformRequest from './transformRequest';
import transformResponse from './transformResponse';
import createError from './createError';

/**
 * 请求函数
 *
 * @param config Axios 请求配置
 */
export default function request(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise(function dispatchAdapter(resolve, reject): void {
    const { adapter, cancelToken } = config;
    const requestConfig = transformRequest(config);

    /**
     * 捕获错误
     *
     * @param message  错误信息
     * @param response Axios 响应体
     */
    function catchError(message: any, response?: AxiosResponse): void {
      if (typeof message !== 'string') {
        message = '配置不正确或者网络异常';
      }

      reject(createError(message, config, requestConfig, response));
    }

    if (adapter === void 0) {
      catchError('平台适配失败，您需要参阅文档使用自定义适配器手动适配当前平台');

      return;
    }

    /**
     * 效验状态码
     *
     * @param res 请求结果
     */
    function handleResponse(res: Response): void {
      const response = transformResponse(res, config);

      if (config.validateStatus === void 0 || config.validateStatus(response.status)) {
        resolve(response);
      } else {
        catchError(`请求失败，状态码为 ${response.status}`, response);
      }
    }

    // 使用适配器发送请求
    const task = adapter({
      ...requestConfig,
      success: handleResponse,
      fail: catchError,
    });

    // 如果存在取消令牌
    // 则调用取消令牌里的 listener 监听用户的取消操作
    if (cancelToken !== void 0) {
      cancelToken.listener.then(function onCanceled(reason): void {
        if (task !== void 0) {
          task.abort();
        }

        reject(reason);
      });
    }
  });
}
