import { AxiosAdapterRequestConfig } from 'src';

export function asyncNext() {
  return Promise.resolve().then;
}

export function asyncTimeout(delay = 0) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function captureError<T = any>(fn: () => void) {
  try {
    fn();
    throw new Error('without Error');
  } catch (err) {
    return err as T;
  }
}

export function checkStack(error: Error) {
  if (error.stack) {
    return error.stack.indexOf('at') === error.stack.indexOf('at /');
  }
  return true;
}

export function noop() {
  return;
}

export function mockResponseBase(
  status: number,
  statusText: string,
  headers: AnyObject,
  data: AnyObject,
) {
  return {
    status,
    statusText,
    headers,
    data,
  };
}

export function mockResponse(headers: AnyObject = {}, data: AnyObject = {}) {
  return mockResponseBase(200, 'OK', headers, data);
}

export function mockResponseError(
  headers: AnyObject = {},
  data: AnyObject = {},
) {
  return mockResponseBase(400, 'FAIL', headers, data);
}

export interface MockAdapterOptions {
  headers?: AnyObject;
  data?: AnyObject;
  delay?: number;
  before?: (config: AxiosAdapterRequestConfig) => void;
  after?: () => void;
}

export function mockAdapterBase(
  type: 'success' | 'error' | 'fail' = 'success',
  options: MockAdapterOptions = {},
) {
  const { headers = {}, data = {}, delay = 0, before, after } = options;

  return (config: AxiosAdapterRequestConfig) => {
    before?.(config);
    setTimeout(() => {
      switch (type) {
        case 'success':
          config.success(mockResponse(headers, data));
          break;
        case 'error':
          config.success(mockResponseError(headers, data));
          break;
        case 'fail':
          config.fail(mockResponseError(headers));
          break;
      }
      after?.();
    }, delay);
  };
}

export function mockAdapter(options: MockAdapterOptions = {}) {
  return mockAdapterBase('success', options);
}

export function mockAdapterError(options: MockAdapterOptions = {}) {
  return mockAdapterBase('error', options);
}

export function mockAdapterFail(options: MockAdapterOptions = {}) {
  return mockAdapterBase('fail', options);
}
