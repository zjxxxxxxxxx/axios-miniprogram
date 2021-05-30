import { AxiosAdapterTask } from './adapter';
import { AxiosRequestConfig, AxiosResponse, AxiosResponseError } from './Axios';
export declare type AxiosErrorResponse = AxiosResponse | AxiosResponseError;
declare class AxiosError extends Error {
  isAxiosError: boolean;
  config: AxiosRequestConfig;
  request?: AxiosAdapterTask;
  response?: AxiosErrorResponse;
  constructor(
    message: string,
    config: AxiosRequestConfig,
    request?: AxiosAdapterTask,
    response?: AxiosErrorResponse,
  );
}
export declare function createError(
  message: string,
  config: AxiosRequestConfig,
  request?: AxiosAdapterTask,
  response?: AxiosErrorResponse,
): AxiosError;
export {};
