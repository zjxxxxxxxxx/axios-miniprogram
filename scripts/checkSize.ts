import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { basename } from 'node:path';
import fg from 'fast-glob';
import chalk from 'chalk';

export async function checkSize(source: string) {
  for (const filePath of await fg(source)) {
    const file = readFileSync(filePath);
    const minSize = (file.length / 1024).toFixed(2) + 'kb';
    const gzipped = gzipSync(file);
    const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb';

    console.log(
      `${chalk.gray(
        chalk.bold(basename(filePath)),
      )} min:${minSize} / gzip:${gzippedSize}`,
    );
  }
}
