const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const archiver = require('archiver');
const chalk = require('chalk');

const zip = archiver('zip');
const distPath = path.resolve(__dirname, '..', 'dist');
const distZipName = 'dist.zip';
const distZipPath = path.resolve(__dirname, '..', distZipName);

console.log();
console.log(chalk.cyan(`${distPath} → ${distZipName}...`));

rimraf(distZipPath, () => {
  const outputStream = fs.createWriteStream(distZipPath);
  const startTime = +new Date();

  zip.on('error', (error) => {
    throw error;
  });
  zip.on('finish', () => {
    const endTime = +new Date();
    const ss = ((endTime - startTime) / 1000).toFixed(1);

    console.log(chalk.green(`created ${distZipName} in ${ss}s`));
  });
  zip.pipe(outputStream);
  zip.directory(distPath, false);
  zip.finalize();
});
