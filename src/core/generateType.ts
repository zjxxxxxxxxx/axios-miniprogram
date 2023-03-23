import { toLowerCase } from '../helpers/utils';
import { AxiosAdapterRequestType } from './adapter';
import { AxiosRequestConfig, AxiosRequestMethodAlias } from './Axios';

export function generateType(
  config: AxiosRequestConfig,
): AxiosAdapterRequestType {
  let requestType: AxiosAdapterRequestType = 'request';
  const method = toLowerCase<AxiosRequestMethodAlias>(config.method, 'get');

  if (config.upload && method === 'post') {
    requestType = 'upload';
  }
  if (config.download && method === 'get') {
    requestType = 'download';
  }

  return requestType;
}
