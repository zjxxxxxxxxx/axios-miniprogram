/*
 * @Author: early-autumn
 * @Date: 2020-04-15 22:09:38
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-18 17:00:38
 */
import { AxiosRequestConfig } from '../types';

const defaults: AxiosRequestConfig = {
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
  timeout: 0,
  dataType: 'json',
  responseType: 'text',
  enableHttp2: false,
  enableQuic: false,
  enableCache: false,
  sslVerify: false,
};

export default defaults;
