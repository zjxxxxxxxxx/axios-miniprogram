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

export interface AxiosInstanceDefaults extends AxiosRequestConfig {
  /**
   * 请求头
   */
  headers: Required<AxiosRequestHeaders>;
}

export interface AxiosInstance extends AxiosDomainRequest, Axios {
  /**
   * 默认请求配置
   */
  defaults: AxiosInstanceDefaults;
}

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
   * @param defaults 默认配置
   */
  create(defaults?: AxiosRequestConfig): AxiosInstance;
  /**
   * 创建适配器
   *
   * @param platform 平台
   */
  createAdapter: typeof createAdapter;
  /**
   * 判断 Cancel
   */
  isCancel: typeof isCancel;
  /**
   * 判断 AxiosError
   */
  isAxiosError: typeof isAxiosError;
}

function createInstance(defaults: AxiosRequestConfig) {
  const context = new Axios(defaults);
  const instance = context.request as AxiosInstance;

  Object.assign(instance, context, {
    // instance.fork 内部调用了 context 的私有方法
    // 所以直接调用 instance.fork 会导致程序抛出无法访问私有方法的异常
    // instance.fork 调用时 this 重新指向 context，解决此问题
    fork: context.fork.bind(context),
  });
  Object.setPrototypeOf(instance, Object.getPrototypeOf(context));

  return instance;
}

const axios = createInstance(defaults) as AxiosStatic;

axios.Axios = Axios;
axios.CancelToken = CancelToken;
axios.create = function create(defaults) {
  return createInstance(mergeConfig(axios.defaults, defaults));
};
axios.createAdapter = createAdapter;
axios.isCancel = isCancel;
axios.isAxiosError = isAxiosError;

export default axios;
