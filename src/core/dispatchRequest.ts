import { isCancel, isCancelToken } from './cancel';
import { flattenHeaders } from './flattenHeaders';
import { transformData } from './transformData';
import { request } from './request';
import { AxiosRequestConfig, AxiosResponse } from './Axios';
import { transformURL } from './transformURL';
import { isAxiosError } from './createError';

function throwIfCancellationRequested(config: AxiosRequestConfig) {
  const { cancelToken } = config;
  if (isCancelToken(cancelToken)) {
    cancelToken.throwIfRequested();
  }
}

export default function dispatchRequest<TData = unknown>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse> {
  throwIfCancellationRequested(config);

  config.method = config.method ?? 'get';
  config.url = transformURL(config);
  config.headers = flattenHeaders(config);
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest,
  );

  function transformer(response: AxiosResponse<TData>) {
    response.data = transformData(
      response.data as AnyObject,
      response.headers,
      config.transformResponse,
    ) as TData;
  }

  return request<TData>(config)
    .then((response: AxiosResponse<TData>) => {
      throwIfCancellationRequested(config);
      transformer(response);
      return response;
    })
    .catch((reason: unknown) => {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (isAxiosError(reason)) {
          transformer(reason.response as AxiosResponse<TData>);
        }
      }
      throw config.errorHandler?.(reason) ?? reason;
    });
}
