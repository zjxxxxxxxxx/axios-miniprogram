import { isString } from './helpers/isTypes';
import Axios, {
  AxiosConstructor,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from './core/Axios';
import { CancelToken, CancelTokenConstructor, isCancel } from './core/cancel';
import { isAxiosError } from './core/createError';
import { mergeConfig } from './core/mergeConfig';
import { AxiosAdapter, createAdapter, AxiosPlatform } from './adapter';
import defaults from './defaults';

export interface AxiosInstanceDefaults extends AxiosRequestConfig {
  /**
   * 请求头
   */
  headers: Required<AxiosRequestHeaders>;
}

export interface AxiosInstance extends Axios {
  /**
   * 默认请求配置
   */
  defaults: AxiosInstanceDefaults;
  <TData = unknown>(
    /**
     * 请求配置
     */
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
  <TData = unknown>(
    /**
     * 请求地址
     */
    url: string,
    /**
     * 请求配置
     */
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
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
  createAdapter(platform: AxiosPlatform): AxiosAdapter;
  /**
   * 判断 Cancel
   */
  isCancel: typeof isCancel;
  /**
   * 判断 AxiosError
   */
  isAxiosError: typeof isAxiosError;
}

function createInstance(defaults: AxiosRequestConfig): AxiosInstance {
  const instance = new Axios(defaults);

  function axios<TData = unknown>(
    urlOrConfig: string | AxiosRequestConfig,
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<TData>> {
    if (isString(urlOrConfig)) {
      config.url = urlOrConfig;
    } else {
      config = urlOrConfig;
    }

    return instance.request(config);
  }

  Object.assign(axios, instance);
  Object.setPrototypeOf(
    axios,
    Object.assign(Object.getPrototypeOf(instance), {
      // axios.fork 内部调用了 instance 的私有方法，但是无法直接访问私有方法程序抛出导致异常
      // axios.fork 调用时 this 重新指向 instance，解决此问题
      fork: instance.fork.bind(instance),
    }),
  );

  return axios as AxiosInstance;
}

const axios = createInstance(defaults) as AxiosStatic;

axios.Axios = Axios;
axios.CancelToken = CancelToken;
axios.create = function create(defaults: AxiosRequestConfig): AxiosInstance {
  return createInstance(mergeConfig(axios.defaults, defaults));
};
axios.createAdapter = createAdapter;
axios.isCancel = isCancel;
axios.isAxiosError = isAxiosError;

export default axios;
