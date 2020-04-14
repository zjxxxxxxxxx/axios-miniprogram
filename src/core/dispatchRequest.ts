/*
 * @Author: early-autumn
 * @Date: 2020-04-13 15:22:22
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 23:23:46
 */
import { AxiosRequestConfig, AxiosPromise } from '../types';
import request from './request';
import transformRequestConfig from './transformRequestConfig';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  transformRequestConfig(config);

  return request(config);
}
