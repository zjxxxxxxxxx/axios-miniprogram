import { isArray, isFunction } from '../helpers/isTypes';

export interface AxiosTransformCallback<TData = unknown> {
  (
    /**
     * 数据
     */
    data?: TData,
    /**
     * 头信息
     */
    headers?: AnyObject,
  ): TData | undefined;
}

export type AxiosTransformer<TData = unknown> =
  | AxiosTransformCallback<TData>
  | AxiosTransformCallback<TData>[];

export function transformData<TData = unknown>(
  data?: TData,
  headers?: AnyObject,
  transforms?: AxiosTransformer<TData>,
) {
  if (!isArray(transforms)) {
    if (isFunction(transforms)) {
      transforms = [transforms];
    } else {
      transforms = [];
    }
  }

  transforms.forEach((transform) => {
    data = transform(data, headers);
  });

  return data as TData;
}
