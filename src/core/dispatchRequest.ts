import { isPlainObject } from '../helpers/is';
import { isCancel } from './cancel';
import { flattenHeaders } from './flattenHeaders';
import { transformData } from './transformData';
import { request } from './request';
import { AxiosRequestConfig, AxiosResponse } from './Axios';
import { transformURL } from './transformURL';

function throwIfCancellationRequested(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

export default function dispatchRequest<TData = any>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse> {
  throwIfCancellationRequested(config);

  config.url = transformURL(config);
  config.headers = flattenHeaders(config);
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest,
  );

  return request<TData>(config).then(
    (response: AxiosResponse<TData>): AxiosResponse<TData> => {
      throwIfCancellationRequested(config);

      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse,
      ) as TData;

      return response;
    },
    (reason: any): Promise<any> => {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        if (isPlainObject(reason.response)) {
          reason.response.data = transformData(
            reason.response.data,
            reason.response.headers,
            config.transformResponse,
          );
        }
      }

      return Promise.reject(config.errorHandler?.(reason) ?? reason);
    },
  );
}
