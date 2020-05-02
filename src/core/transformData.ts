/*
 * @Author: early-autumn
 * @Date: 2020-04-16 22:37:44
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-25 09:30:42
 */
import { Data, Headers, TransformData } from '../types';

/**
 * 转换数据
 *
 * @param data       请求数据/响应数据
 * @param headers    请求头/响应头
 * @param transforms 请求数据转换函数/响应数据转换函数
 */
export default function transformData(data: Data, headers: Headers, transforms?: TransformData | TransformData[]) {
  if (transforms === undefined) {
    return data;
  }

  if (!Array.isArray(transforms)) {
    transforms = [transforms];
  }

  transforms.forEach((transform: TransformData) => {
    data = transform(data, headers);
  });

  return data;
}
