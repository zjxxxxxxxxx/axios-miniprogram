import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { getAdapterDefault } from 'src/adapter';

const platforms = [
  'uni',
  'wx',
  'my',
  'swan',
  'tt',
  'qq',
  'qh',
  'ks',
  'dd',
  'jd',
  'unknown',
];

describe.each(platforms)('src/adapter.ts', (p) => {
  beforeEach(() => {
    vi.stubGlobal(p, {
      request: vi.fn(),
      uploadFile: vi.fn(),
      downloadFile: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('应该可以获取到默认的平台适配器', () => {
    const a = getAdapterDefault();
    if (p !== 'unknown') {
      expect(a).toBeTypeOf('function');
      (expect(a).property('name') as any).toBe('adapter');
    } else {
      // unknown 未知平台
      expect(a).toBeUndefined();
    }
  });
});

describe.each(platforms)('src/adapter.ts', (p) => {
  beforeEach(() => {
    vi.stubGlobal(p, {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('应该获取不到默认的平台适配器', () => {
    expect(getAdapterDefault()).toBeUndefined();
  });
});
