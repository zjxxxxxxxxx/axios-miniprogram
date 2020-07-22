import isCancel from '../../src/cancel/isCancel';
import Cancel from '../../src/cancel/Cancel';

describe('测试 src/cancel/isCancel', () => {
  it('是一个取消?', () => {
    const cancel1 = {};
    const cancel2 = new Cancel();

    expect(isCancel(cancel1)).toBe(false);
    expect(isCancel(cancel2)).toBe(true);
  });
});
