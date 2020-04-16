/*
 * @Author: early-autumn
 * @Date: 2020-04-15 12:45:18
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-16 23:29:26
 */
import { AxiosRequestConfig, ResponseData, AxiosResponse, AxiosInstance } from './types';
import Axios from './core/Axios';
import Cancel from './cancel/Cancel';
import CancelToken from './cancel/CancelToken';
import isCancel from './cancel/isCancel';
import mergeConfig from './helper/mergeConfig';
import defaults from './helper/defaults';

/**
 * 创建一个新的 Axios 实例
 *
 * 返回一个 axios 增强函数
 */
function createInstance(config: AxiosRequestConfig): AxiosInstance {
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

  // Axios 实例的所有属性和方法合并至 axios 函数
  Object.assign(axios, instance);

  return axios as AxiosInstance;
}

const axios = createInstance(defaults);

// 添加 Axios 类
axios.Axios = Axios;

// 添加 create 工厂方法
axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(axios.defaults, config));
};

// 添加取消相关
axios.Cancel = Cancel;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;

export default axios;
