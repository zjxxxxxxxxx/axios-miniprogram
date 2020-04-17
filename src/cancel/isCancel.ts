/*
 * @Author: early-autumn
 * @Date: 2020-04-14 09:23:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 09:27:59
 */
import Cancel from './Cancel';

/**
 * 是否是取消请求实例
 *
 * @param value 判断的值
 */
export default function isCancel(value: any) {
  return value && value instanceof Cancel;
}
