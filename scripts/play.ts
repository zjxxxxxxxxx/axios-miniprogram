import enquirer from 'enquirer';
import consola from 'consola';
import { exec, resolve, safeExit } from './utils';
import { readdirSync } from 'fs';

safeExit(main);

async function main() {
  const { framework } = await enquirer.prompt<{ framework: string }>({
    type: 'select',
    name: 'framework',
    message: '请选择多端框架',
    choices: readdirSync(resolve('examples')),
  });

  const metas = framework === 'taro' ? taroMetas() : uniAppMetas();
  const { platform } = await enquirer.prompt<{ platform: string }>({
    type: 'select',
    name: 'platform',
    message: '请选择启动平台',
    choices: metas,
  });

  console.log();
  consola.info(
    `启动${metas.find((meta) => meta.name === platform)!.message}...`,
  );

  exec(`pnpm --filter @examples/${framework} dev:${platform}`);
}

function taroMetas() {
  return [
    { name: 'h5', message: 'H5' },
    { name: 'weapp', message: '微信小程序' },
    { name: 'swan', message: '百度小程序' },
    { name: 'alipay', message: '支付宝小程序' },
    { name: 'tt', message: '抖音小程序' },
    { name: 'qq', message: 'QQ 小程序' },
    { name: 'jd', message: '京东小程序' },
    { name: 'dd', message: '钉钉小程序' },
    { name: 'lark', message: '飞书小程序' },
    { name: 'kwai', message: '快手小程序' },
  ];
}

function uniAppMetas() {
  return [...taroMetas(), { name: 'xhs', message: '小红书小程序' }];
}
