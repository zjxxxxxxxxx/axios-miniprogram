import { AxiosDomainRequest } from './core/AxiosDomain';
import Axios, {
  AxiosConstructor,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from './core/Axios';
import { CancelToken, CancelTokenConstructor, isCancel } from './core/cancel';
import { isAxiosError } from './core/createError';
import { mergeConfig } from './core/mergeConfig';
import { createAdapter } from './adapter';
import defaults from './defaults';

/**
 * axios 实例默认配置
 */
export interface AxiosInstanceDefaults extends AxiosRequestConfig {
  /**
   * 请求头
   */
  headers: Required<AxiosRequestHeaders>;
}

/**
 * axios 实例
 */
export interface AxiosInstance extends AxiosDomainRequest, Axios {
  /**
   * 默认请求配置
   */
  defaults: AxiosInstanceDefaults;
}

/**
 * axios 静态对象
 */
export interface AxiosStatic extends AxiosInstance {
  /**
   * Axios 类
   */
  Axios: AxiosConstructor;
  /**
   * 取消令牌
   */
  CancelToken: CancelTokenConstructor;
  /**
   * 创建 axios 实例
   *
   * @param config 默认配置
   */
  create(config?: AxiosRequestConfig): AxiosInstance;
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

function createInstance(config: AxiosRequestConfig) {
  const context = new Axios(config);
  const instance = context.request as AxiosInstance;

  Object.assign(instance, context);
  Object.setPrototypeOf(instance, Axios.prototype);

  return instance;
}

const axios = createInstance(defaults) as AxiosStatic;

axios.create = function create(config) {
  return createInstance(mergeConfig(axios.defaults, config));
};

axios.Axios = Axios;
axios.CancelToken = CancelToken;
axios.createAdapter = createAdapter;
axios.isCancel = isCancel;
axios.isAxiosError = isAxiosError;

export default axios;
