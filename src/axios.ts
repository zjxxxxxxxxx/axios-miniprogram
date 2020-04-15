/*
 * @Author: early-autumn
 * @Date: 2020-04-15 12:45:18
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-15 22:45:22
 */
import {
  AxiosRequest,
  AxiosRequestDefault,
  AxiosMethodConfig,
  ResponseData,
  AxiosResponse,
  AxiosInstance,
} from './types';
import Axios from './core/Axios';
import defaults from './helper/defaults';

/**
 * 创建一个新的 Axios 实例
 *
 * 返回一个 axios 增强函数
 */
function createInstance(config: AxiosRequestDefault): AxiosInstance {
  const instance = new Axios(config);

  /**
   * 支持重载的 axios 函数
   *
   * @调用方式一
   *
   * @param url    调用方式一: 请求配置
   * @param config 调用方式一: 空
   *
   * @调用方式二
   *
   * @param url    调用方式二: 请求地址
   * @param config 调用方式二: 额外配置
   */
  function axios<T extends ResponseData>(
    url: AxiosRequest | string,
    config: AxiosMethodConfig = {}
  ): Promise<AxiosResponse<T>> {
    let requestConfig: AxiosRequest;

    // 调用方式一处理请求配置
    if (typeof url !== 'string') {
      requestConfig = url;
    }
    // 调用方式二处理请求配置
    else {
      requestConfig = { ...config, url };
    }

    return instance.request(requestConfig);
  }

  // Axios 实例的所有属性和方法合并至 axios 函数
  Object.assign(axios, instance);

  return axios as AxiosInstance;
}

export default createInstance(defaults);
