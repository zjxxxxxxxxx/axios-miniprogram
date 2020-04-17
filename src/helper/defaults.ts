/*
 * @Author: early-autumn
 * @Date: 2020-04-15 22:09:38
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 11:11:28
 */
import { AxiosRequestConfig } from '../types';

const defaults: AxiosRequestConfig = {
  adapter: wx?.request,
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, test/plain, */*',
    },
    options: {},
    get: {},
    head: {},
    post: {
      'Context-Type': 'application/x-www-form-urlencoded',
    },
    put: {
      'Context-Type': 'application/x-www-form-urlencoded',
    },
    delete: {},
    trace: {},
    connect: {},
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
};

export default defaults;
