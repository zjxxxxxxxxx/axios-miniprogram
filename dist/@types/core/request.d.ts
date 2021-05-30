import { AxiosRequestConfig, AxiosResponse } from './Axios';
export declare function request<TData = any>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<TData>>;
