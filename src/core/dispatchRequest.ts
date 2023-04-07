import { isFunction } from '../helpers/isTypes';
import { isCancel, isCancelToken } from './cancel';
import { flattenHeaders } from './flattenHeaders';
import { AxiosTransformer, transformData } from './transformData';
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
  const { transformRequest, transformResponse } = config;

  config.url = transformURL(config);
  config.method = config.method ?? 'get';
  config.headers = flattenHeaders(config);

  transform(config, transformRequest);

  function onSuccess(response: AxiosResponse<TData>) {
    throwIfCancellationRequested(config);
    transform(response, transformResponse);
    return response;
  }

  function onError(reason: unknown) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (isAxiosError(reason)) {
        transform(reason.response as AxiosResponse<TData>, transformResponse);
      }
    }

    if (isFunction(config.errorHandler)) {
      return config.errorHandler(reason);
    }

    return Promise.reject(reason);
  }

  function transform<TData = unknown>(
    target: AxiosRequestConfig | AxiosResponse<TData>,
    transformer?: AxiosTransformer | AxiosTransformer[],
  ) {
    target.data = transformData(
      target.data as AnyObject,
      target.headers,
      transformer,
    ) as TData;
  }

  return request<TData>(config).then(onSuccess).catch(onError);
}
