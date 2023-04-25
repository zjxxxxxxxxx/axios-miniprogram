import {
  CancelToken,
  CancelTokenConstructor,
  isCancel,
} from './request/cancel';
import { isAxiosError } from './request/createError';
import Axios, { AxiosConstructor } from './core/Axios';
import { AxiosInstance, createInstance } from './core/createInstance';
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
}

const axios = createInstance(defaults) as AxiosStatic;
axios.version = version;
axios.Axios = Axios;
axios.CancelToken = CancelToken;
axios.createAdapter = createAdapter;
axios.isCancel = isCancel;
axios.isAxiosError = isAxiosError;

export default axios;
