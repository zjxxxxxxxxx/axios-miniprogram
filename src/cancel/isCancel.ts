/*
 * @Author: early-autumn
 * @Date: 2020-04-14 09:23:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 15:15:27
 */
import Cancel from './Cancel';

/**
 * 是否是取消请求实例
 *
 * @param value 判断的值
 */
export default function isCancel(value: any): boolean {
  return !!value && value instanceof Cancel;
}
