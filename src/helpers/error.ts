export function assert(condition: boolean, msg: string) {
  if (!condition) {
    throwError(msg);
  }
}

export function throwError(msg: string): void {
  const error = new Error(`[axios-miniprogram]: ${msg}`);
  cleanStack(error);
  throw error;
}

export function cleanStack(error: Error) {
  if (error.stack) {
    const start = error.stack.indexOf('at');
    const end = error.stack.indexOf('at /');

    if (start !== end) {
      const removed = error.stack.slice(start, end);
      error.stack = error.stack.replace(removed, '');
    }
  }
}
