/*
 * @Author: early-autumn
 * @Date: 2020-04-15 22:09:38
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-15 23:20:30
 */
import { AxiosRequestDefault } from '../types';

const defaults: AxiosRequestDefault = {
  method: 'get',
  header: {
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
};

export default defaults;
