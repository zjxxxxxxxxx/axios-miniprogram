import { AxiosAdapterRequestConfig } from './adapter';
import { AxiosRequestConfig, AxiosResponse, AxiosResponseError } from './Axios';

export type AxiosErrorResponse = AxiosResponse | AxiosResponseError;

class AxiosError extends Error {
  public isAxiosError = true;

  public config: AxiosRequestConfig;

  public request: AxiosAdapterRequestConfig;

  public response?: AxiosErrorResponse;

  public constructor(
    message: string,
    config: AxiosRequestConfig,
    request: AxiosAdapterRequestConfig,
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
  request: AxiosAdapterRequestConfig,
  response?: AxiosErrorResponse,
): AxiosError {
  return new AxiosError(message, config, request, response);
}
