import request from '../../src/core/request';
import CancelToken from '../../src/cancel/CancelToken';
import isCancel from '../../src/cancel/isCancel';

describe('测试 src/core/request.ts', () => {
  it('默认', () => {
    request({}).then(void 0, (err) =>
      expect(err.message).toBe('平台适配失败，您需要参阅文档使用自定义适配器手动适配当前平台')
    );
  });

  it('请求失败', () => {
    request({
      adapter({ fail }): any {
        fail({});

        return 'task';
      },
    }).then(void 0, (err) => expect(err.message).toBe('配置不正确或者网络异常'));
  });

  it('取消请求', () => {
    request({
      adapter({ fail }) {
        setTimeout(fail);

        return {
          abort: jest.fn(),
        };
      },
      cancelToken: new CancelToken(function executor(c) {
        c();
      }),
    }).then(void 0, (err) => expect(isCancel(err)).toBe(true));
  });
});
