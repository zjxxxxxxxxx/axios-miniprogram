import { test } from 'vitest';
import {
  requestMethodNames,
  requestMethodWithParamsNames,
  requestMethodWithDataNames,
} from '@/core/AxiosDomain';
import { AxiosAdapterRequestConfig } from '@/adapter';

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

export interface MockAdapterOptions {
  headers?: AnyObject;
  data?: AnyObject;
  delay?: number;
  before?: (config: AxiosAdapterRequestConfig) => void;
  after?: () => void;
}

function mockAdapterBase(
  type: 'success' | 'error' | 'fail' = 'success',
  options: MockAdapterOptions = {},
) {
  const {
    headers = {},
    data = {
      result: null,
    },
    delay = 0,
    before,
    after,
  } = options;

  return (config: AxiosAdapterRequestConfig) => {
    let canceled = false;

    before?.(config);

    setTimeout(() => {
      if (!canceled) {
        switch (type) {
          case 'success':
            config.success(mockResponse(200, 'OK', headers, data));
            break;
          case 'error':
            config.success(mockResponse(500, 'ERROR', headers, data));
            break;
          case 'fail':
            config.fail(mockResponse(400, 'FAIL', headers, data));
            break;
        }

        after?.();
      }
    }, delay);

    return {
      abort() {
        canceled = true;
      },
    };
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

export const testEachMethods = test.each([
  ...requestMethodNames,
  ...requestMethodWithParamsNames,
  ...requestMethodWithDataNames,
]);
