import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { ExecSyncOptions, execSync } from 'node:child_process';

export const __dirname = fileURLToPath(new URL('../', import.meta.url));
export const require = createRequire(import.meta.url);
export const pkgPath = path.resolve(__dirname, 'package.json');
export const distPath = path.resolve(__dirname, 'dist');

export const resolve = (...paths: string[]) =>
  path.resolve(__dirname, ...paths);

export const exec = (command: string, options: ExecSyncOptions = {}) =>
  execSync(command, {
    stdio: 'inherit',
    encoding: 'utf-8',
    ...options,
  });

export const getPkgJSON = () => require(pkgPath);
