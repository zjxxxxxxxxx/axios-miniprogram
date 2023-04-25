import {
  CancelToken,
  CancelTokenConstructor,
  isCancel,
} from './request/cancel';
import { isAxiosError } from './request/createError';
import Axios, { AxiosConstructor, AxiosRequestConfig } from './core/Axios';
import { AxiosInstance, createInstance } from './core/createInstance';
import { mergeConfig } from './core/mergeConfig';
import { createAdapter } from './adpater/createAdapter';
import defaults from './defaults';
import { version } from './version';

/**
 * axios 静态对象
 */
export interface AxiosStatic extends AxiosInstance {
  /**
   * 版本号
   */
  version: string;
  /**
   * Axios 类
   */
  Axios: AxiosConstructor;
  /**
   * 取消令牌
   */
  CancelToken: CancelTokenConstructor;
  /**
   * 创建适配器
   */
  createAdapter: typeof createAdapter;
  /**
   * 传入取消请求错误返回 true
   */
  isCancel: typeof isCancel;
  /**
   * 传入响应错误返回 true
   */
  isAxiosError: typeof isAxiosError;
  /**
   * 创建 axios 实例
   *
   * @param config 默认配置
   */
  create(config?: AxiosRequestConfig): AxiosInstance;
}

const axios = createInstance(defaults) as AxiosStatic;
axios.create = function create(config) {
  return createInstance(mergeConfig(axios.defaults, config));
};
axios.version = version;
axios.Axios = Axios;
axios.CancelToken = CancelToken;
axios.createAdapter = createAdapter;
axios.isCancel = isCancel;
axios.isAxiosError = isAxiosError;

export default axios;
