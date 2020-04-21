/*
 * @Author: early-autumn
 * @Date: 2020-04-20 22:42:46
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-21 09:57:39
 */
import { CancelAction } from '../../src/types';
import dispatchRequest from '../../src/core/dispatchRequest';
import CancelToken from '../../src/cancel/CancelToken';
import isCancel from '../../src/cancel/isCancel';

describe('测试 src/core/dispatchRequest.ts', () => {
  it('默认', () => {
    dispatchRequest({}).then(undefined, (err) => {
      expect(err.message).toBe('平台适配失败，您需要参阅文档使用自定义适配器手动适配当前平台');
    });
  });

  it('请求失败', () => {
    dispatchRequest({
      adapter({ success }): any {
        success({ status: 200, data: '' });

        return 'task';
      },
      validateStatus(status) {
        return status === -1;
      },
    }).then(undefined, (err) => expect(err.response.status).toBe(200));
  });

  it('取消请求', () => {
    let cancel: CancelAction;

    dispatchRequest({
      adapter({ success }) {
        cancel();
        setTimeout(() => {
          success({ status: 200, data: '' });
        });
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    }).then(undefined, (err) => expect(isCancel(err)).toBe(true));
  });
});
