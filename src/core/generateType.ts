import { assert, isPlainObject, isString } from '../utils';
import { AdapterRequestType } from './adapter';
import { AxiosRequestConfig } from './Axios';

export function generateType(config: AxiosRequestConfig): AdapterRequestType {
  let requestType: AdapterRequestType = 'request';

  if (
    !isPlainObject(config.headers) ||
    !/multipart\/form-data/.test(
      config.headers['Content-Type'] ?? config.headers['content-type'] ?? '',
    )
  ) {
    return requestType;
  }

  const method = config.method?.toLowerCase() ?? 'get';

  if (method === 'post') {
    assert(isPlainObject(config.data), '上传文件时 data 需要是一个 object');
    assert(
      isString(config.data!.fileName),
      '上传文件时 data.fileName 需要是一个 string',
    );
    assert(
      isString(config.data!.filePath),
      '上传文件时 data.filePath 需要是一个 string',
    );

    requestType = 'upload';
  }

  if (method === 'get') {
    requestType = 'download';
  }

  return requestType;
}
