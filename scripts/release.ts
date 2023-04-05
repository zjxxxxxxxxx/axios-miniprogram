import fs from 'node:fs';
import semver from 'semver';
import enquirer from 'enquirer';
import consola from 'consola';
import { exec, pkgPath, getPkgJSON } from './utils';

const pkg = getPkgJSON();
const { version: currentVersion } = pkg;

main().catch((err) => exit(err.message));

async function main() {
  checkBranch();

  const version = await inputVersion();

  consola.info(`Update version ${currentVersion} -> ${version}`);
  updateVersion(version);

  consola.info('Changelog');
  exec('pnpm changelog');

  consola.info('Git add');
  exec('git add .');
  exec(`git commit -m "chore: release v${version}"`);
  exec(`git tag -a v${version} -m "v${version}"`);

  consola.info('Git push');
  exec('git push');

  consola.info('Git push tag');
  exec(`git push origin v${version}`);
}

function checkBranch() {
  const releaseBranch = 'main';
  const currentBranch = exec('git branch --show-current', {
    stdio: 'pipe',
  })
    .toString()
    .trim();

  if (currentBranch !== releaseBranch) {
    exit(`请切回 ${releaseBranch} 分支进行发版！`);
  }
}

async function inputVersion() {
  const releases = createReleases();
  let targetVersion: string;

  const { release } = await enquirer.prompt<{ release: string }>({
    type: 'select',
    name: 'release',
    message: '请选择版本类型',
    choices: [...releases, 'custom'],
  });

  if (release === 'custom') {
    const { version } = await enquirer.prompt<{
      version: string;
    }>({
      type: 'input',
      name: 'version',
      message: '请输入自定义版本号',
      initial: currentVersion,
    });
    targetVersion = version;
  } else {
    targetVersion = (release.match(/\((.+)\)/) as string[])[1];
  }

  if (
    !semver.valid(targetVersion) ||
    !semver.lt(currentVersion, targetVersion)
  ) {
    exit(`无效的版本号: ${targetVersion}`);
  }

  const { yes: confirmRelease } = await enquirer.prompt<{ yes: boolean }>({
    type: 'confirm',
    name: 'yes',
    message: `确定发版: v${targetVersion} ？`,
  });

  if (!confirmRelease) {
    exit(`取消发版: v${targetVersion}`);
  }

  return targetVersion;
}

function createReleases() {
  const types = [
    ['patch'],
    ['minor'],
    ['major'],
    ['prepatch', 'beta'],
    ['preminor', 'beta'],
    ['premajor', 'beta'],
    ['prerelease', 'beta'],
  ];
  const releases: string[] = [];
  for (const [type, preid] of types) {
    releases.push(`${type} (${semver.inc(currentVersion, type, preid)})`);
  }
  return releases;
}

function exit(msg: string) {
  updateVersion(currentVersion);
  consola.error(msg || '已退出');
  process.exit();
}

function updateVersion(version: string) {
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}
