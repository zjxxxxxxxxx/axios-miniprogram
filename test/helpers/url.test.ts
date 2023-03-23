import {
  buildURL,
  combineURL,
  dynamicInterpolation,
  isAbsoluteURL,
  isDynamicURL,
} from '../../src/helpers/url';

describe('对 src/helpers/url.ts 进行测试', () => {
  it('测试 buildURL() 执行结果是否符合预期', () => {
    expect(buildURL('/api')).toBe('/api');
    expect(buildURL('/api', {})).toBe('/api');
    expect(buildURL('/api#id=1', {})).toBe('/api');
    expect(
      buildURL('/api', {
        id: 1,
      }),
    ).toBe('/api?id=1');
    expect(buildURL('/api', { id: 100 }, () => 'id=1')).toBe('/api?id=1');
    expect(
      buildURL('/api?sid=0', {
        id: 1,
      }),
    ).toBe('/api?sid=0&id=1');
    expect(buildURL('/api?sid=0', { id: 100 }, () => 'id=1')).toBe(
      '/api?sid=0&id=1',
    );
  });

  it('测试 combineURL() 执行结果是否符合预期', () => {
    expect(combineURL('https://www.server.com', 'api')).toBe(
      'https://www.server.com/api',
    );
    expect(combineURL('https://www.server.com/', '/api')).toBe(
      'https://www.server.com/api',
    );
    expect(combineURL('https://www.server.com:8080//', '//api//')).toBe(
      'https://www.server.com:8080/api/',
    );
  });

  it('测试 dynamicInterpolation() 执行结果是否符合预期', () => {
    expect(
      dynamicInterpolation('https://www.server.com/api/user/:id', {
        id: 1,
        name: 'user',
      }),
    ).toBe('https://www.server.com/api/user/1');
    expect(
      dynamicInterpolation('https://www.server.com:8080/api/user/:id', {
        id: 1,
        name: 'user',
      }),
    ).toBe('https://www.server.com:8080/api/user/1');
    expect(
      dynamicInterpolation('https://www.server.com/api/user/:id/:name', {
        id: 1,
      }),
    ).toBe('https://www.server.com/api/user/1/undefined');
    expect(
      dynamicInterpolation('https://www.server.com/api/user/:id:name', {
        id: 1,
      }),
    ).toBe('https://www.server.com/api/user/1undefined');
  });

  it('测试 isAbsoluteURL() 执行结果是否符合预期', () => {
    expect(isAbsoluteURL('')).toBe(false);
    expect(isAbsoluteURL('/api')).toBe(false);
    expect(isAbsoluteURL('http:')).toBe(false);
    expect(isAbsoluteURL('//file')).toBe(true);
    expect(isAbsoluteURL('https://www.server.com')).toBe(true);
    expect(isAbsoluteURL('file://')).toBe(true);
  });

  it('测试 isDynamicURL() 执行结果是否符合预期', () => {
    expect(isDynamicURL('')).toBe(false);
    expect(isDynamicURL(':id')).toBe(true);
    expect(isDynamicURL(':8080')).toBe(false);
    expect(isDynamicURL('/:id')).toBe(true);
    expect(isDynamicURL('/:8080')).toBe(false);
    expect(isDynamicURL('https://www.server.com:8080')).toBe(false);
    expect(isDynamicURL('/api')).toBe(false);
    expect(isDynamicURL('/api:id')).toBe(true);
    expect(isDynamicURL('/api/:id')).toBe(true);
  });
});
