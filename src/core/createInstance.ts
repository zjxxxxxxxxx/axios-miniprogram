import { dynamicURL } from '../helpers/dynamicURL';
import { combineURL } from '../helpers/combineURL';
import { transformURL } from '../helpers/transformURL';
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
   * @param config 配置
   */
  getUri(config: AxiosRequestConfig): string;
  /**
   * 创建实例
   *
   * @param config 默认配置
   */
  create(config?: AxiosRequestConfig): AxiosInstance;
  /**
   * 扩展实例
   *
   * @param config 默认配置
   */
  extend(config: AxiosRequestConfig): AxiosInstance;
}

export function createInstance(
  defaults: AxiosRequestConfig,
  parentContext?: Axios,
) {
  const context = new Axios(defaults, parentContext);
  const instance = context.request as AxiosInstance;

  instance.getUri = function getUri(config) {
    config.url = dynamicURL(config.url!, config.params, config.data);
    return transformURL(mergeConfig(defaults, config));
  };
  instance.create = function create(config) {
    return createInstance(mergeConfig(defaults, config));
  };
  instance.extend = function extend(config) {
    config.baseURL = combineURL(defaults.baseURL, config.baseURL);
    return createInstance(mergeConfig(defaults, config), context);
  };

  Object.assign(instance, context);
  Object.setPrototypeOf(instance, Axios.prototype);

  return instance;
}
