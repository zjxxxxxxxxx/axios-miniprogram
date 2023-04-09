import { describe, test, expect } from 'vitest';
import { dispatchRequest } from 'src/core/dispatchRequest';

describe('src/core/dispatchRequest.ts', () => {
  test('应该有这些实例属性', () => {
    expect(dispatchRequest).toBeTypeOf('function');
  });
});
