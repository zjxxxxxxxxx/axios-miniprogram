/*
 * @Author: early-autumn
 * @Date: 2020-04-14 09:23:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 19:18:58
 */
import Cancel from './Cancel';

/**
 * 是不是一个取消对象
 *
 * @param value 判断的值
 */
export default function isCancel(value: any) {
  return value && value instanceof Cancel;
}
