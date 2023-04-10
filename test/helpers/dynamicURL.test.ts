import { describe, test, expect } from 'vitest';
import { dynamicURL } from '@/helpers/dynamicURL';

describe('src/helpers/dynamicURL.ts', () => {
  test('应该替换关键字', () => {
    expect(dynamicURL('http://api.com/test/:id', {})).toBe(
      'http://api.com/test/undefined',
    );
    expect(dynamicURL('http://api.com/test/:id', { id: 1 })).toBe(
      'http://api.com/test/1',
    );
  });

  test('应该支持多个关键字', () => {
    expect(
      dynamicURL('http://api.com/tests/name/:name/type/:type/list', {
        name: 'axios',
        type: 0,
      }),
    ).toBe('http://api.com/tests/name/axios/type/0/list');
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
