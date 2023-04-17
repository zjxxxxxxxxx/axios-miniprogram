import { describe, test, expect } from 'vitest';
import { dynamicURL } from '@/helpers/dynamicURL';

describe('src/helpers/dynamicURL.ts', () => {
  test('应该支持空参数', () => {
    expect(dynamicURL('http://api.com/test/:id')).toBe(
      'http://api.com/test/undefined',
    );
    expect(dynamicURL('http://api.com/test/:id', {})).toBe(
      'http://api.com/test/undefined',
    );
    expect(dynamicURL('http://api.com/test/:id', undefined, {})).toBe(
      'http://api.com/test/undefined',
    );
  });

  test('应该支持 params', () => {
    expect(dynamicURL('http://api.com/test/:id', { id: 1 })).toBe(
      'http://api.com/test/1',
    );
  });

  test('应该支持 data', () => {
    expect(dynamicURL('http://api.com/test/:id', {}, { id: 1 })).toBe(
      'http://api.com/test/1',
    );
  });

  test('应该优先从 params 取值', () => {
    expect(dynamicURL('http://api.com/test/:id', { id: 1 }, { id: 2 })).toBe(
      'http://api.com/test/1',
    );
    expect(
      dynamicURL('http://api.com/test/:id1/:id2', { id1: 1 }, { id2: 2 }),
    ).toBe('http://api.com/test/1/2');
  });

  test('应该从 params 删除对应的值', () => {
    const p = { id1: 1 };
    const d = { id2: 2 };

    expect(dynamicURL('http://api.com/test/:id1/:id2', p, d)).toBe(
      'http://api.com/test/1/2',
    );
    expect(p.id1).toBeUndefined();
    expect(d.id2).toBe(2);
  });

  test('应该忽略端口号', () => {
    expect(
      dynamicURL(':8080/:id', {
        id: 0,
      }),
    ).toBe(':8080/0');
    expect(
      dynamicURL('http://api.com:8080/:id', {
        id: 0,
      }),
    ).toBe('http://api.com:8080/0');
  });
});
