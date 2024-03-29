import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { getDefaultAdapter } from '@/adpater/getDefaultAdapter';

const platforms = [
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

describe.each(platforms)('src/adapter/getDefaultAdapter.ts', (p) => {
  beforeEach(() => {
    vi.stubGlobal(p, {
      request: vi.fn(),
      downloadFile: vi.fn(),
      uploadFile: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('应该可以获取到默认的平台适配器', () => {
    const a = getDefaultAdapter();
    if (p !== 'unknown') {
      expect(a).toBeTypeOf('function');
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
    expect(getDefaultAdapter()).toBeUndefined();
  });
});

describe.each(platforms)('src/adapter.ts', (p) => {
  beforeEach(() => {
    vi.stubGlobal(p, undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('应该获取不到默认的平台适配器', () => {
    expect(getDefaultAdapter()).toBeUndefined();
  });
});
