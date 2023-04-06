import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { __dirname, getPkgJSON } from './utils';

const changelogPath = path.resolve(__dirname, 'CHANGELOG.md');
const releaselogPath = path.resolve(__dirname, 'RELEASELOG.md');
const { version } = getPkgJSON();
const versionRE = new RegExp(`^# \\[?${version}\\]?[ (]`);

main();

async function main() {
  const changelog = readline.createInterface({
    input: fs.createReadStream(changelogPath),
    crlfDelay: Infinity,
  });

  let releaselog = '';
  for await (const line of changelog) {
    if (line.startsWith('# ') && !versionRE.test(line)) {
      break;
    }
    releaselog += `${line}\n`;
  }

  fs.writeFileSync(releaselogPath, releaselog);
}
