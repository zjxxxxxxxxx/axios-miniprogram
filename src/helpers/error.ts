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
  const { stack } = error;
  if (stack) {
    const start = stack.indexOf('at');
    const end = stack.search(/at ([\w-_.]+:)?\//i);
    if (start < end) {
      const removed = stack.slice(start, end);
      error.stack = stack.replace(removed, '');
    }
  }
}
