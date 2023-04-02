import { describe, test, expect } from 'vitest';
import { dynamicURL } from 'src/helpers/dynamicURL';

describe('src/helpers/dynamicURL.ts', () => {
  test('应该替换关键字', () => {
    expect(dynamicURL('http://api.com/user/:id', {})).toBe(
      'http://api.com/user/undefined',
    );
    expect(dynamicURL('http://api.com/user/:id', { id: 1 })).toBe(
      'http://api.com/user/1',
    );
  });

  test('应该支持多个关键字', () => {
    expect(
      dynamicURL('http://api.com/users/name/:name/age/:age/list', {
        name: 'my',
        age: 18,
      }),
    ).toBe('http://api.com/users/name/my/age/18/list');
  });
});
