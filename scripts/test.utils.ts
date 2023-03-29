export function asyncNext() {
  return Promise.resolve().then;
}

export function asyncTimeout(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function captureError<T = any>(fn: () => void): T {
  try {
    fn();
    throw new Error('fn not fail...');
  } catch (err) {
    return err as T;
  }
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

export function mockSuccessResponse(
  headers: AnyObject = {},
  data: AnyObject = {},
) {
  return mockResponse(200, 'OK', headers, data);
}

export function mockFailResponse(
  headers: AnyObject = {},
  data: AnyObject = {},
) {
  return mockResponse(400, 'FAIL', headers, data);
}
