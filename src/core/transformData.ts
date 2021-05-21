import { isArray, isUndefined } from '../utils';
import {
  AxiosRequestData,
  AxiosRequestFormData,
  AxiosResponseHeaders,
} from './Axios';

export interface AxiosTransformer {
  (
    data?: AxiosRequestData | AxiosRequestFormData,
    headers?: AxiosResponseHeaders,
  ): AxiosRequestData | AxiosRequestFormData;
}

export function transformData(
  data?: AxiosRequestData | AxiosRequestFormData,
  headers?: AxiosResponseHeaders,
  transforms?: AxiosTransformer | AxiosTransformer[],
): AxiosRequestData | AxiosRequestFormData | undefined {
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
