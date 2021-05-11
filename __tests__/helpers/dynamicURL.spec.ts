import dynamicURL from '../../src/helpers/dynamicURL';

describe('测试 src/helpers/dynamicURL.ts', () => {
  it('run', () => {
    expect(dynamicURL('http://www.api.com/user/:id', { id: 1 })).toBe(
      'http://www.api.com/user/1',
    );
    expect(dynamicURL('http://www.api.com:8080/user/:id', { id: 1 })).toBe(
      'http://www.api.com:8080/user/1',
    );
    expect(dynamicURL('http://www.api.com/user/:id', { id: 1 })).toBe(
      'http://www.api.com/user/1',
    );
    expect(dynamicURL('http://www.api.com/user:id/', { id: 1 })).toBe(
      'http://www.api.com/user1/',
    );
    expect(dynamicURL('http://www.api.com/:id/user', { id: 1 })).toBe(
      'http://www.api.com/1/user',
    );
  });
});
