import fs from 'node:fs';
import fg from 'fast-glob';
import { Toolkit } from 'actions-toolkit';
import consola from 'consola';
import { distPath, getFileName } from './utils';

const { UPLOAD_URL, RELEASE_ID } = process.env;
const toolkit = new Toolkit();

main();

async function main() {
  consola.info('Upload asset\n');
  for (const filePath of await fg(`${distPath}/**.zip`)) {
    await toolkit.github.repos.uploadReleaseAsset({
      ...toolkit.context.repo,
      url: UPLOAD_URL,
      headers: {
        'content-type': 'application/zip',
        'content-length': fs.statSync(filePath).size,
      },
      name: getFileName(filePath),
      release_id: Number(RELEASE_ID),
      data: fs.readFileSync(filePath) as unknown as string,
    });
  }
}
