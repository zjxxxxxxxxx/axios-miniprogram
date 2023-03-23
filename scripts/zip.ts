// import fs from 'node:fs';
// import path from 'node:path';
// import archiver from 'archiver';
// import { getPkgJSON } from './utils';

// const pkg = getPkgJSON();

// const zip = archiver.create('zip', {});
// const distPath = path.resolve(__dirname, '..', 'dist');
// const distZipName = `download/${pkg.version}.zip`;
// const distZipPath = path.resolve(__dirname, '..', distZipName);

// function main() {
//   const outputStream = fs.createWriteStream(distZipPath);
//   const startTime = +new Date();

//   zip.glob()
//   zip.on('error', (error) => {
//     throw error;
//   });
//   zip.on('finish', () => {
//     const endTime = +new Date();
//     const ss = ((endTime - startTime) / 1000).toFixed(1);

//   });
//   zip.pipe(outputStream);
//   zip.directory(distPath, pkg.name);
//   zip.finalize();
// }

// function getFilePaths(){

// }

// function createZipName(){
//   return
// }
