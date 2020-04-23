/*
 * @Author: early-autumn
 * @Date: 2020-04-15 12:45:18
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-23 10:44:18
 */
import { AxiosRequestConfig, Data, AxiosResponse, AxiosBaseInstance, AxiosInstance } from './types';
import Axios from './core/Axios';
import mergeConfig from './core/mergeConfig';
import CancelToken from './cancel/CancelToken';
import isCancel from './cancel/isCancel';
import defaults from './defaults';

/**
 * 创建一个新的 Axios 实例
 *
 * 返回一个 Axios 实例增强
 */
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const instance = new Axios(config);

  /**
   * 支持重载的 axios 函数
   */
  function axios<T extends Data>(
    url: AxiosRequestConfig | string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    let requestConfig: AxiosRequestConfig;

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

  // instance 的属性合并到 axios 函数中
  Object.assign(axios, instance);
  // instance 的方法合并到 axios 函数中
  Object.setPrototypeOf(axios, Object.getPrototypeOf(instance));

  return axios as AxiosInstance;
}

/**
 * Axios 实例拓展
 */
const axios = createInstance(defaults);

// 添加 create 工厂方法
axios.create = function create(config: AxiosRequestConfig = {}): AxiosBaseInstance {
  return createInstance(mergeConfig(axios.defaults, config));
};

// 添加 Axios 类
axios.Axios = Axios;

// 添加 CancelToken 类
axios.CancelToken = CancelToken;

// 添加 检查错误是否来自取消请求 方法
axios.isCancel = isCancel;

export default axios;
