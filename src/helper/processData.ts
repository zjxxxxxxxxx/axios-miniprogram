/*
 * @Author: early-autumn
 * @Date: 2020-04-13 22:50:35
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 23:09:59
 */
import { Data } from '../types';
import { isPlainObject } from './utils';

/**
 * 处理请求参数
 *
 * @param data 请求参数
 */
export default function processData(data: Data): Data {
  if (!isPlainObject(data)) {
    return data;
  }

  return JSON.stringify(data);
}
