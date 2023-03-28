import { AxiosAdapterRequestType } from '../adapter';
import { AxiosRequestConfig } from './Axios';

export function generateType(
  config: AxiosRequestConfig,
): AxiosAdapterRequestType {
  let requestType: AxiosAdapterRequestType = 'request';

  const method = config.method!.toUpperCase();
  if (config.upload && method === 'POST') {
    requestType = 'upload';
  }
  if (config.download && method === 'GET') {
    requestType = 'download';
  }

  return requestType;
}
