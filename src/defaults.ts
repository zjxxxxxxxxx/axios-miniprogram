import { getDefaultAdapter } from './adpater/getDefaultAdapter';
import { AxiosInstanceDefaults } from './core/createInstance';

const defaults: AxiosInstanceDefaults = {
  // 适配器，在支持的平台中有值。
  // 对于不支持平台而言，此值始终为 undefined，需要您手动适配。
  adapter: getDefaultAdapter(),

  // 请求头
  headers: {
    // 通用请求头
    common: {
      Accept: 'application/json, text/plain, */*',
    },
    options: {}, // OPTIONS 方法请求头
    get: {}, // GET 方法请求头
    head: {}, // HEAD 方法请求头
    post: {}, // POST 方法请求头
    put: {}, // PUT 方法请求头
    patch: {}, // PATCH 方法请求头
    delete: {}, // DELETE 方法请求头
    trace: {}, // TRACE 方法请求头
    connect: {}, // CONNECT 方法请求头
  },

  // 校验状态码
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300;
  },

  // 返回的数据格式
  dataType: 'json',

  // 响应的数据类型
  responseType: 'text',

  // 超时时长
  timeout: 10000,
};

export default defaults;
