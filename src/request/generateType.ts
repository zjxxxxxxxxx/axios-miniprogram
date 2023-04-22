import { AxiosRequestConfig } from '../core/Axios';
import { AxiosAdapterRequestType } from '../adpater/createAdapter';

export function generateType(config: AxiosRequestConfig) {
  let requestType: AxiosAdapterRequestType = 'request';

  if (config.download && /^GET/i.test(config.method!)) {
    requestType = 'download';
  } else if (config.upload && /^POST/i.test(config.method!)) {
    requestType = 'upload';
  }

  return requestType;
}
