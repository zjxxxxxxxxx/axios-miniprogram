import { describe, test, expect } from 'vitest';
import { generateType } from 'src/core/generateType';
import Axios from 'src/core/Axios';

describe('src/core/generateType.ts', () => {
  test('应该是一个 reuqest', () => {
    for (const a of [...Axios.as, ...Axios.pas, ...Axios.das]) {
      expect(generateType({ method: a })).toBe('request');
    }
  });

  test('应该是一个 upload', () => {
    expect(generateType({ method: 'post', upload: true })).toBe('upload');
  });

  test('应该是一个 download', () => {
    expect(generateType({ method: 'get', download: true })).toBe('download');
  });
});
