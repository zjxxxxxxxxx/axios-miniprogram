import { AxiosRequestConfig } from './types';
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
