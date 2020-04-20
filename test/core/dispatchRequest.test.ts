/*
 * @Author: early-autumn
 * @Date: 2020-04-20 22:42:46
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 23:22:29
 */
import dispatchRequest from '../../src/core/dispatchRequest';
import CancelToken from '../../src/cancel/CancelToken';
import isCancel from '../../src/cancel/isCancel';
import { CancelAction } from '../../src/types';

const task = {
  abort: jest.fn(),
};

describe('测试 src/core/dispatchRequest.ts', () => {
  it('默认', async () => {
    await dispatchRequest({}).catch((err) => {
      expect(err.message).toBe('平台适配失败，您需要参阅文档使用自定义适配器手动适配当前平台');
    });
  });

  it('请求失败', async () => {
    await dispatchRequest({
      adapter({ success }) {
        success({ status: 200, data: '' });
        return task;
      },
      validateStatus(status) {
        return status === -1;
      },
    }).catch((err) => expect(err.response.status).toBe(200));
  });

  it('取消请求', () => {
    try {
      let cancel: CancelAction;
      dispatchRequest({
        adapter({ success }) {
          cancel();
          setTimeout(() => {
            success({ status: 200, data: '' });
          });
          return task;
        },
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      });
    } catch (err) {
      expect(isCancel(err)).toBe(true);
    }
  });
});
