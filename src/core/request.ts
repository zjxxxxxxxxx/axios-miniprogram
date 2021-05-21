import { assert, isFunction, isPlainObject } from '../utils';
import { AxiosAdapterRequestConfig, AdapterRequestMethod } from './adapter';
import { AxiosRequestConfig, AxiosResponse, AxiosResponseError } from './Axios';
import { isCancelToken } from './cancel';
import { AxiosErrorResponse, createError } from './createError';
import { generateType } from './generateType';

function tryToggleProgressUpdate(
  adapterConfig: AxiosAdapterRequestConfig,
  progressUpdate?: Function,
) {
  if (isFunction(progressUpdate)) {
    switch (adapterConfig.type) {
      case 'upload':
        if (isFunction(adapterConfig.onUploadProgress)) {
          progressUpdate(adapterConfig.onUploadProgress);
        }
        break;
      case 'download':
        if (isFunction(adapterConfig.onDownloadProgress)) {
          progressUpdate(adapterConfig.onDownloadProgress);
        }
        break;
      default:
    }
  }
}

export function request<TData = any>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<TData>> {
  return new Promise((resolve, reject) => {
    assert(isFunction(config.adapter), 'adapter 需要是一个 Function 类型');

    const adapterConfig: AxiosAdapterRequestConfig = Object.assign({}, config, {
      url: config.url ?? '',
      type: generateType(config),
      method: (config.method?.toUpperCase() as AdapterRequestMethod) ?? 'GET',
      success(response: AxiosResponse): void {
        if (
          !isFunction(config.validateStatus) ||
          config.validateStatus(response.status)
        ) {
          resolve(response);
        } else {
          catchError('请求失败', response);
        }
      },
      fail(error: AxiosResponseError): void {
        catchError('网络错误', error);
      },
    });

    function catchError(message: string, response?: AxiosErrorResponse): void {
      reject(createError(message, config, adapterConfig, response));
    }

    const adapterTask = config.adapter!(adapterConfig);

    if (isPlainObject(adapterTask)) {
      tryToggleProgressUpdate(adapterConfig, adapterTask.onProgressUpdate);
    }

    if (isCancelToken(config.cancelToken)) {
      config.cancelToken.listener.then((reason: any) => {
        if (isPlainObject(adapterTask)) {
          tryToggleProgressUpdate(adapterConfig, adapterTask.offProgressUpdate);

          if (isFunction(adapterTask.abort)) {
            adapterTask.abort();
          }
        }

        reject(reason);
      });
    }
  });
}
