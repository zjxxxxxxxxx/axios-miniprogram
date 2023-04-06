import { isArray, isUndefined } from '../helpers/isTypes';
import { AxiosRequestData } from './Axios';

export interface AxiosTransformer {
  (
    /**
     * 数据
     */
    data?: AxiosRequestData,
    /**
     * 头信息
     */
    headers?: AnyObject,
  ): AxiosRequestData;
}

export function transformData(
  data?: AxiosRequestData,
  headers?: AnyObject,
  transforms?: AxiosTransformer | AxiosTransformer[],
): AxiosRequestData | undefined {
  if (isUndefined(transforms)) {
    return data;
  }

  if (!isArray(transforms)) {
    transforms = [transforms];
  }

  transforms.forEach((transform: AxiosTransformer) => {
    data = transform(data, headers);
  });

  return data;
}
