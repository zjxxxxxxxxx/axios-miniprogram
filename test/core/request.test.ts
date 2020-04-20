/*
 * @Author: early-autumn
 * @Date: 2020-04-20 22:51:26
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 23:26:18
 */
import request from '../../src/core/request';
import CancelToken from '../../src/cancel/CancelToken';
import isCancel from '../../src/cancel/isCancel';

const task = {
  abort: jest.fn(),
};

describe('测试 src/core/request.ts', () => {
  it('默认', async () => {
    await request({}).catch((err) => {
      expect(err.message).toBe('平台适配失败，您需要参阅文档使用自定义适配器手动适配当前平台');
    });
  });

  it('请求失败', async () => {
    await request({
      adapter({ fail }) {
        fail({});
        return task;
      },
    }).catch((err) => {
      expect(err.message).toBe('配置不正确或者网络异常');
    });
  });

  it('取消请求', async () => {
    await request({
      adapter() {
        return task;
      },
      cancelToken: new CancelToken(function executor(c) {
        c();
      }),
    }).catch((err) => expect(isCancel(err)).toBe(true));
  });
});
