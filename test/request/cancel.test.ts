import { describe, test, expect, vi } from 'vitest';
import {
  asyncNext,
  captureError,
  mockAdapter,
  noop,
  asyncTimeout,
} from 'scripts/test.utils';
import {
  Cancel,
  isCancel,
  CancelToken,
  isCancelToken,
  CancelAction,
} from '@/request/cancel';
import axios from '@/axios';

describe('src/request/cancel.ts', () => {
  test('应该支持空参数', () => {
    const c = new Cancel();

    expect(c.message).toBeUndefined();
    expect(c.toString()).toBe('Cancel');
  });

  test('传递参数时应该有正确的返回结果', () => {
    const c = new Cancel('error');

    expect(c.message).toBe('error');
    expect(c.toString()).toBe('Cancel: error');
  });

  test('应该正确判断 Cancel', () => {
    expect(isCancel(undefined)).toBeFalsy();
    expect(isCancel({})).toBeFalsy();
    expect(new Cancel()).toBeTruthy();
  });

  test('应该可以取消', () => {
    let ca!: CancelAction;
    const ct = new CancelToken((a) => (ca = a));

    expect(ct.throwIfRequested()).toBeUndefined();

    ca();

    expect(() => ct.throwIfRequested()).toThrowError();
  });

  test('应该抛出正确的异常信息', async () => {
    let ca!: (msg: string) => void;
    const ct = new CancelToken((a) => (ca = a));

    const te = () => ct.throwIfRequested();

    ca('stop');

    expect(te).toThrowErrorMatchingInlineSnapshot(`
      Cancel {
        "message": "stop",
      }
    `);
    expect(captureError<Cancel>(te).toString()).toBe('Cancel: stop');
  });

  test('回调函数应该被异步执行', async () => {
    const cb = vi.fn();
    let ca!: () => void;
    const ct = new CancelToken((a) => (ca = a));

    ct.onCancel(cb);
    expect(cb).not.toBeCalled();

    ca();

    expect(cb).not.toBeCalled();

    await asyncNext();
    expect(cb).toBeCalled();
    expect(isCancel(cb.mock.calls[0][0])).toBeTruthy();
  });

  test('应该正确判断 CancelToken', () => {
    expect(isCancelToken(undefined)).toBeFalsy();
    expect(isCancelToken({})).toBeFalsy();
    expect(isCancelToken(new CancelToken(noop))).toBeTruthy();
  });

  test('应该有正确返回结果', () => {
    const s = CancelToken.source();

    expect(s.cancel).toBeTypeOf('function');
    expect(isCancelToken(s.token)).toBeTruthy();
  });

  test('应该可以取消', () => {
    const s = CancelToken.source();

    expect(s.token.throwIfRequested()).toBeUndefined();

    s.cancel();

    expect(() => s.token.throwIfRequested()).toThrowError();
  });

  test('多次取消时应该只有第一次会生效', () => {
    const s = CancelToken.source();

    expect(s.token.throwIfRequested()).toBeUndefined();

    s.cancel('1');
    s.cancel('2');
    s.cancel('3');

    expect(() => s.token.throwIfRequested()).toThrowError('1');
  });

  test('应该可以在请求发送之前取消', async () => {
    const cb = vi.fn();
    const s = CancelToken.source();

    s.cancel();

    axios({
      adapter: mockAdapter(),
      cancelToken: s.token,
    }).catch(cb);

    await asyncTimeout();
    expect(cb).toBeCalled();
    expect(isCancel(cb.mock.calls[0][0])).toBeTruthy();
  });

  test('应该可以在请求发送之后取消', async () => {
    const cb = vi.fn();
    const s = CancelToken.source();

    axios({
      adapter: mockAdapter(),
      cancelToken: s.token,
    }).catch(cb);

    s.cancel();

    await asyncTimeout();
    expect(cb).toBeCalled();
    expect(isCancel(cb.mock.calls[0][0])).toBeTruthy();
  });
});
