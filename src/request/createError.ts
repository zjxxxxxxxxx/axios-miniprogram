import { cleanStack } from '../helpers/error';
import { AxiosAdapterPlatformTask } from '../adpater/createAdapter';
import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseError,
} from '../core/Axios';

export type AxiosErrorResponse = AxiosResponse | AxiosResponseError;

class AxiosError extends Error {
  config: AxiosRequestConfig;
  request: AxiosAdapterPlatformTask;
  response: AxiosErrorResponse;

  constructor(
    message: string,
    config: AxiosRequestConfig,
    response: AxiosErrorResponse,
    request: AxiosAdapterPlatformTask,
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
  response: AxiosErrorResponse,
  request: AxiosAdapterPlatformTask,
) {
  const axiosError = new AxiosError(message, config, response, request);
  cleanStack(axiosError);
  return axiosError;
}

export function isAxiosError(value: unknown): value is AxiosError {
  return value instanceof AxiosError;
}
