import fs from 'node:fs';
import fg from 'fast-glob';
import JSZip from 'jszip';
import consola from 'consola';
import chalk from 'chalk';
import { distPath, exec } from './utils';

main();

async function main() {
  exec('pnpm build');

  consola.info('Generate zip\n');
  for (const filePath of await fg(`${distPath}/**.js`)) {
    await generateZip(filePath, filePath.replace(/\.js$/, '.zip'));
  }
}

function generateZip(inputPath: string, outputPath: string) {
  return new Promise((resolve, reject) => {
    const inputName = getFileName(inputPath);
    const outputName = getFileName(outputPath);

    console.log(chalk.cyanBright.bold(`${inputPath} → dist/${outputName}...`));

    const start = Date.now();
    JSZip()
      .file(inputName, fs.createReadStream(inputPath), {
        compressionOptions: {
          level: 9,
        },
      })
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream(outputPath))
      .on('finish', (result) => {
        console.log(
          `${chalk.green('created')} ${chalk.greenBright.bold(
            `dist/${outputName} in ${Date.now() - start}ms\n`,
          )}`,
        );
        exec(`rimraf ${inputPath}`);
        resolve(result);
      })
      .on('error', reject);
  });
}

function getFileName(filePath: string) {
  const result = filePath.match(/\/([^/]*)$/);
  if (!result) {
    throw new Error(`无效的文件路径 ${filePath}`);
  }
  return result[1];
}
