/*
 * @Author: early-autumn
 * @Date: 2020-04-15 22:09:38
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-18 20:34:41
 */
import { AxiosRequestConfig } from '../types';
import adaptive from '../adapter/adaptive';

const defaults: AxiosRequestConfig = {
  adapter: adaptive(),
  method: 'get',
  headers: {
    common: {
      Accept: 'application/json, test/plain, */*',
    },
    options: {},
    trace: {},
    connect: {},
    get: {},
    head: {},
    delete: {},
    post: {
      'Context-Type': 'application/x-www-form-urlencoded',
    },
    put: {
      'Context-Type': 'application/x-www-form-urlencoded',
    },
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  transformResponse: [
    function transformResponse(data) {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {}
      }
      return data;
    },
  ],
  timeout: 0,
  dataType: 'json',
  responseType: 'text',
  enableHttp2: false,
  enableQuic: false,
  enableCache: false,
  sslVerify: true,
};

export default defaults;
