import { isPlainObject, isString } from '../utils';
import { AdapterRequestType } from './adapter';
import { AxiosRequestConfig } from './Axios';

function isUpload(config: AxiosRequestConfig): boolean {
  if (
    !isString(config.method) ||
    !isPlainObject(config.headers) ||
    !isPlainObject(config.data)
  ) {
    return false;
  }

  const method = config.method.toLowerCase();
  const contentType =
    config.headers['Content-Type'] ?? config.headers['content-type'];

  return (
    method === 'post' &&
    /multipart\/form-data/.test(contentType) &&
    isString(config.data.fileName) &&
    isString(config.data.filePath)
  );
}

function isDownload(config: AxiosRequestConfig): boolean {
  const method = config.method?.toLowerCase() ?? 'get';

  return method === 'get' && config.responseType === 'file';
}

export function generateType(config: AxiosRequestConfig): AdapterRequestType {
  let requestType: AdapterRequestType = 'request';

  if (isUpload(config)) {
    requestType = 'upload';
  }

  if (isDownload(config)) {
    requestType = 'download';
  }

  return requestType;
}
