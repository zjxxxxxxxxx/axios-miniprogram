import fs from 'node:fs';
import readline from 'node:readline';
import { getPkgJSON, resolve } from './utils';

const changelogPath = resolve('CHANGELOG.md');
const releaselogPath = resolve('RELEASELOG.md');
const { version } = getPkgJSON();
const versionRE = new RegExp(`^#{1,2} \\[?${version}\\]?\\(?`);

main();

async function main() {
  const changelog = readline.createInterface({
    input: fs.createReadStream(changelogPath),
    crlfDelay: Infinity,
  });

  let releaselog = '';
  for await (const line of changelog) {
    if (/^#{1,2} /.test(line) && !versionRE.test(line)) {
      break;
    }
    releaselog += `${line}\n`;
  }

  fs.writeFileSync(releaselogPath, releaselog);
}
