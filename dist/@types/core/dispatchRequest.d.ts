import { AxiosRequestConfig, AxiosResponse } from './Axios';
export default function dispatchRequest<TData = any>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse>;
