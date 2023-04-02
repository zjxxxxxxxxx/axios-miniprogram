import { describe, test, expect } from 'vitest';
import { mockAdapterSuccess } from 'scripts/test.utils';
import { generateType } from 'src/core/generateType';
import Axios from 'src/core/Axios';
import axios from 'src/axios';

describe('src/core/generateType.ts', () => {
  test('应该是一个 reuqest', () => {
    for (const alias of [...Axios.as, ...Axios.pas, ...Axios.das]) {
      expect(generateType({ method: alias })).toBe('request');

      axios({
        adapter: mockAdapterSuccess({
          before: (config) => {
            expect(config.type).toBe('request');
          },
        }),
        method: alias,
      });
    }
  });

  test('应该是一个 upload', () => {
    expect(generateType({ method: 'post', upload: true })).toBe('upload');

    axios({
      adapter: mockAdapterSuccess({
        before: (config) => {
          expect(config.type).toBe('upload');
        },
      }),
      method: 'post',
      upload: true,
    });
  });

  test('应该是一个 download', () => {
    expect(generateType({ method: 'get', download: true })).toBe('download');

    axios({
      adapter: mockAdapterSuccess({
        before: (config) => {
          expect(config.type).toBe('download');
        },
      }),
      method: 'get',
      download: true,
    });
  });
});
