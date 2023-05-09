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
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  response: AxiosErrorResponse,
  request: AxiosAdapterPlatformTask,
) {
  return new AxiosError(message, config, response, request);
}

export function isAxiosError(value: unknown): value is AxiosError {
  return value instanceof AxiosError;
}
