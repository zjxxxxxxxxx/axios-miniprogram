import adaptive from '../src/adaptive';

declare global {
  namespace NodeJS {
    interface Global {
      wx: any;
    }
  }
}

describe('测试 src/adaptive.ts', () => {
  it('适配成功', () => {
    const request = jest.fn();
    global.wx = {
      request,
    };

    const adapter = adaptive();

    expect(adapter).toBe(request);
  });

  it('适配失败', () => {
    global.wx = void 0;

    expect(adaptive()).toBeUndefined();
  });
});
