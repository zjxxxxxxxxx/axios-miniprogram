import enquirer from 'enquirer';
import consola from 'consola';
import { exec, resolve } from './utils';
import { safeExit } from './utils';

const configPath = resolve('example/config');
const configTempPath = resolve('example/config/temp');

safeExit(main);

async function main() {
  const { platform } = await enquirer.prompt<{ platform: string }>({
    type: 'select',
    name: 'platform',
    message: '请选择启动平台',
    choices: metas(),
  });

  console.log();
  consola.info(
    `运行${metas().find((meta) => meta.name === platform)!.message}`,
  );
  exec(`tsc ${configTempPath}/**.ts --outDir ${configPath}`);
  exec(`pnpm --filter example dev:${platform}`);
}

function metas() {
  return [
    { name: 'weapp', message: '微信小程序' },
    { name: 'swan', message: '百度小程序' },
    { name: 'alipay', message: '支付宝小程序' },
    { name: 'tt', message: '抖音小程序' },
    { name: 'qq', message: 'QQ 小程序' },
    { name: 'jd', message: '京东小程序' },
    { name: 'dd', message: '钉钉小程序' },
    { name: 'lark', message: '飞书小程序' },
    { name: 'kwai', message: '快手小程序' },
    { name: 'h5', message: 'H5' },
  ];
}
