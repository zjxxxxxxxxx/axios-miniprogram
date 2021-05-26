import { toLowerCase } from '../helpers/utils';
import { AdapterRequestType } from './adapter';
import { AxiosRequestConfig, AxiosRequestMethodAlias } from './Axios';

export function generateType(config: AxiosRequestConfig): AdapterRequestType {
  let requestType: AdapterRequestType = 'request';

  const method = toLowerCase<AxiosRequestMethodAlias>(config.method, 'get');

  if (config.upload && method === 'post') {
    requestType = 'upload';
  }

  if (config.download && method === 'get') {
    requestType = 'download';
  }

  return requestType;
}
