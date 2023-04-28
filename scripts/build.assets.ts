import fs from 'node:fs';
import { basename } from 'node:path';
import fg from 'fast-glob';
import JSZip from 'jszip';
import consola from 'consola';
import chalk from 'chalk';
import { distPath, exec } from './utils';
import { checkSize } from './checkSize';

main();

async function main() {
  exec('pnpm build');

  console.log('');
  consola.info('Generate assets\n');
  for (const filePath of await fg(`${distPath}/**.js`)) {
    await generateZip(filePath, filePath.replace(/\.js$/, '.zip'));
  }
  checkSize(`${distPath}/**.zip`);
}

function generateZip(inputPath: string, outputPath: string) {
  const start = Date.now();

  const inputName = basename(inputPath);
  const outputName = basename(outputPath);

  console.log(chalk.cyanBright.bold(`${inputPath} → dist/${outputName}...`));

  return new Promise((resolve, reject) => {
    const finish = (result) => {
      console.log(
        `${chalk.green('created')} ${chalk.greenBright.bold(
          `dist/${outputName} in ${Date.now() - start}ms\n`,
        )}`,
      );
      exec(`rimraf ${inputPath}`);
      resolve(result);
    };

    JSZip()
      .file(inputName, fs.createReadStream(inputPath), {
        compressionOptions: {
          level: 9,
        },
      })
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream(outputPath))
      .on('finish', finish)
      .on('error', reject);
  });
}
