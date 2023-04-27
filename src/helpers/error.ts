export function assert(condition: boolean, msg: string) {
  if (!condition) {
    throwError(msg);
  }
}

export function throwError(msg: string): void {
  throw new Error(`[axios-miniprogram]: ${msg}`);
}
