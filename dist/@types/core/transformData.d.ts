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
export declare function transformData(
  data?: AxiosRequestData | AxiosRequestFormData,
  headers?: AxiosResponseHeaders,
  transforms?: AxiosTransformer | AxiosTransformer[],
): AxiosRequestData | AxiosRequestFormData | undefined;
