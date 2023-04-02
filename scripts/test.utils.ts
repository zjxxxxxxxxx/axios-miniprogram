import { AxiosAdapterRequestConfig } from 'src';

export function asyncNext() {
  return Promise.resolve().then;
}

export function asyncTimeout(delay = 0) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function captureError<T = any>(fn: () => void): T {
  try {
    fn();
    throw new Error('without Error');
  } catch (err) {
    return err as T;
  }
}

export function cleanedStack(error: Error) {
  if (error.stack) {
    return error.stack.indexOf('at') === error.stack.indexOf('at /');
  }
  return true;
}

export function noop() {
  return;
}

export function mockResponse(
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

export function mockSuccess(headers: AnyObject = {}, data: AnyObject = {}) {
  return mockResponse(200, 'OK', headers, data);
}

export function mockFail(headers: AnyObject = {}, data: AnyObject = {}) {
  return mockResponse(400, 'FAIL', headers, data);
}

export interface MockAdapterOptions {
  headers?: AnyObject;
  data?: AnyObject;
  delay?: number;
  before?: (config: AxiosAdapterRequestConfig) => void;
  after?: () => void;
}

export function mockAdapter(
  type: 'success' | 'fail',
  options: MockAdapterOptions = {},
) {
  const { headers = {}, data = {}, delay = 0, before, after } = options;

  return (config: AxiosAdapterRequestConfig) => {
    before?.(config);
    setTimeout(() => {
      if (type === 'success') {
        config.success(mockSuccess(headers, data));
      } else {
        config.fail(mockFail(headers, data));
      }
      after?.();
    }, delay);
  };
}

export function mockAdapterSuccess(options: MockAdapterOptions = {}) {
  return mockAdapter('success', options);
}

export function mockAdapterFail(options: MockAdapterOptions = {}) {
  return mockAdapter('fail', options);
}
