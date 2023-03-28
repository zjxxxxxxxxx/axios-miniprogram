import { isArray, isUndefined } from '../helpers/isTypes';
import { AxiosRequestFormData } from './Axios';

export interface AxiosTransformer {
  (data?: AnyObject | AxiosRequestFormData, headers?: AnyObject):
    | AnyObject
    | AxiosRequestFormData;
}

export function transformData(
  data?: AnyObject | AxiosRequestFormData,
  headers?: AnyObject,
  transforms?: AxiosTransformer | AxiosTransformer[],
): AnyObject | AxiosRequestFormData | undefined {
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
