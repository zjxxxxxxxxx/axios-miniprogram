import { cleanStack } from '../helpers/error';
import { AxiosAdapterTask } from '../adapter';
import { AxiosRequestConfig, AxiosResponse, AxiosResponseError } from './Axios';

export type AxiosErrorResponse = AxiosResponse | AxiosResponseError;

class AxiosError extends Error {
  public isAxiosError = true;

  public config: AxiosRequestConfig;

  public request?: AxiosAdapterTask;

  public response?: AxiosErrorResponse;

  public constructor(
    message: string,
    config: AxiosRequestConfig,
    request?: AxiosAdapterTask,
    response?: AxiosErrorResponse,
  ) {
    super(message);

    this.config = config;
    this.request = request;
    this.response = response;

    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  request?: AxiosAdapterTask,
  response?: AxiosErrorResponse,
): AxiosError {
  const axiosError = new AxiosError(message, config, request, response);
  cleanStack(axiosError);
  return axiosError;
}
