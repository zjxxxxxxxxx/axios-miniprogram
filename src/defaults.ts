/*
 * @Author: early-autumn
 * @Date: 2020-04-15 22:09:38
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-21 12:12:06
 */
import { Data, AxiosRequestConfig } from './types';
import adaptive from './adaptive';

const defaults: AxiosRequestConfig = {
  /**
   * 适配器
   */
  adapter: adaptive(),

  /**
   * 请求方法
   */
  method: 'get',

  /**
   * 请求头
   */
  headers: {
    common: {
      Accept: 'application/json, test/plain, */*',
    },
    options: {},
    get: {},
    head: {},
    post: {
      'Context-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    put: {
      'Context-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    delete: {},
    trace: {},
    connect: {},
  },

  /**
   * 状态码效验
   *
   * @param status 状态码
   */
  validateStatus: function validateStatus(status: number): boolean {
    return status >= 200 && status < 300;
  },

  /**
   * 响应数据转换
   */
  transformResponse: [
    function transformResponse(data: Data): Data {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {}
      }
      return data;
    },
  ],

  /**
   * 错误处理
   */
  errorHandler: function errorHandler(err: any): Promise<any> {
    return Promise.reject(err);
  },

  /**
   * 超时时间
   */
  timeout: 10000,

  /**
   * 响应数据格式
   */
  dataType: 'json',

  /**
   * 响应数据类型
   */
  responseType: 'text',

  /**
   * 开启 http2
   */
  enableHttp2: false,

  /**
   * 开启 quic
   */
  enableQuic: false,

  /**
   * 开启 cache
   */
  enableCache: false,

  /**
   * 验证 ssl 证书
   */
  sslVerify: true,
};

export default defaults;
