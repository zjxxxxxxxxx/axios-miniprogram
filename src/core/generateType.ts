import { AxiosAdapterRequestType } from '../adapter';
import { AxiosRequestConfig } from './Axios';

const postRE = /^POST$/i;
const getRE = /^GET$/i;

export function generateType(
  config: AxiosRequestConfig,
): AxiosAdapterRequestType {
  let requestType: AxiosAdapterRequestType = 'request';

  if (config.upload && postRE.test(config.method!)) {
    requestType = 'upload';
  } else if (config.download && getRE.test(config.method!)) {
    requestType = 'download';
  }

  return requestType;
}
