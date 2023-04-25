import { combineURL } from '../helpers/combineURL';
import { buildURL } from '../helpers/buildURL';
import Axios, {
  AxiosRequest,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from './Axios';
import { mergeConfig } from './mergeConfig';

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
export interface AxiosInstance extends AxiosRequest, Axios {
  /**
   * 默认请求配置
   */
  defaults: AxiosInstanceDefaults;
  /**
   * 获取 URI
   *
   * @param config 默认配置
   */
  getUri(config: AxiosRequestConfig): string;
  /**
   * 派生领域
   *
   * @param config 默认配置
   */
  fork(config: AxiosRequestConfig): AxiosInstance;
  /**
   * 扩展实例
   *
   * @param config 默认配置
   */
  extend(config: AxiosRequestConfig): AxiosInstance;
}

export function createInstance(config: AxiosRequestConfig, parent?: Axios) {
  const context = new Axios(config, parent);
  const instance = context.request as AxiosInstance;

  instance.getUri = function getUri(config: AxiosRequestConfig) {
    const { url, params, paramsSerializer } = mergeConfig(
      instance.defaults,
      config,
    );
    return buildURL(url, params, paramsSerializer).replace(/^\?/, '');
  };
  instance.extend = function extend(config: AxiosRequestConfig = {}) {
    config.url = combineURL(instance.defaults.baseURL, config.url);
    return createInstance(mergeConfig(instance.defaults, config), context);
  };
  instance.fork = instance.extend;

  Object.assign(instance, context);
  Object.setPrototypeOf(instance, Axios.prototype);

  return instance;
}
