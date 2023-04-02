import { describe, test, expect, vi } from 'vitest';
import {
  asyncNext,
  captureError,
  mockAdapterSuccess,
  noop,
  asyncTimeout,
} from 'scripts/test.utils';
import axios from 'src/axios';
import {
  Cancel,
  isCancel,
  CancelToken,
  isCancelToken,
} from '../../src/core/cancel';

describe('src/helpers/cancel.ts', () => {
  test('应该支持空参数', () => {
    const cancel = new Cancel();

    expect(cancel.message).toBeUndefined();
    expect(cancel.toString()).toBe('Cancel');
  });

  test('传入参数时应该有正确的返回结果', () => {
    const cancel = new Cancel('error');

    expect(cancel.message).toBe('error');
    expect(cancel.toString()).toBe('Cancel: error');
  });

  test('应该正确判断 Cancel', () => {
    expect(isCancel(undefined)).toBeFalsy();
    expect(isCancel({})).toBeFalsy();
    expect(new Cancel()).toBeTruthy();
  });

  test('应该可以取消', () => {
    let cancelAction!: () => void;
    const cancelToken = new CancelToken((action) => {
      cancelAction = action;
    });

    expect(cancelToken.throwIfRequested()).toBeUndefined();
    cancelAction();
    expect(() => cancelToken.throwIfRequested()).toThrowError();
  });

  test('应该抛出正确的异常信息', async () => {
    let cancelAction!: (msg: string) => void;
    const cancelToken = new CancelToken((action) => {
      cancelAction = action;
    });

    cancelAction('stop');
    const error = captureError<Cancel>(() => cancelToken.throwIfRequested());
    expect(error.message).toBe('stop');
    expect(error.toString()).toBe('Cancel: stop');
  });

  test('回调函数应该被异步执行', async () => {
    const canceled = vi.fn();
    let cancelAction!: () => void;
    const cancelToken = new CancelToken((action) => {
      cancelAction = action;
    });
    cancelToken.onCancel(canceled);
    expect(canceled).not.toBeCalled();

    cancelAction();

    expect(canceled).not.toBeCalled();

    await asyncNext();
    expect(canceled).toBeCalled();
    expect(isCancel(canceled.mock.calls[0][0])).toBeTruthy();
  });

  test('应该正确判断 CancelToken', () => {
    expect(isCancelToken(undefined)).toBeFalsy();
    expect(isCancelToken({})).toBeFalsy();
    expect(isCancelToken(new CancelToken(noop))).toBeTruthy();
  });

  test('应该有正确返回结果', () => {
    const source = CancelToken.source();

    expect(source.cancel).toBeTypeOf('function');
    expect(isCancelToken(source.token)).toBeTruthy();
  });

  test('应该可以取消', () => {
    const source = CancelToken.source();

    expect(source.token.throwIfRequested()).toBeUndefined();

    source.cancel();

    expect(() => source.token.throwIfRequested()).toThrowError();
  });

  test('应该可以在请求发出之前取消', async () => {
    const canceled = vi.fn();
    const source = CancelToken.source();

    source.cancel();
    axios({
      adapter: mockAdapterSuccess(),
      cancelToken: source.token,
    }).catch(canceled);

    await asyncTimeout();
    expect(canceled).toBeCalled();
    expect(isCancel(canceled.mock.calls[0][0])).toBeTruthy();
  });

  test('应该可以在请求发出之后取消', async () => {
    const canceled = vi.fn();
    const source = CancelToken.source();

    axios({
      adapter: mockAdapterSuccess(),
      cancelToken: source.token,
    }).catch(canceled);
    source.cancel();

    await asyncTimeout();
    expect(canceled).toBeCalled();
    expect(isCancel(canceled.mock.calls[0][0])).toBeTruthy();
  });
});
