const { execSync } = require('child_process');

const metas = [
  { type: 'feat', section: '✨ Features | 新功能' },
  { type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
  { type: 'test', section: '✅ Tests | 测试' },
  { type: 'docs', section: '📝 Documentation | 文档' },
  { type: 'build', section: '👷‍ Build System | 构建' },
  { type: 'ci', section: '🔧 Continuous Integration | CI 配置' },
  { type: 'perf', section: '⚡ Performance Improvements | 性能优化' },
  { type: 'revert', section: '⏪ Reverts | 回退' },
  { type: 'chore', section: '📦 Chores | 其他更新' },
  { type: 'style', section: '💄 Styles | 风格', hidden: true },
  { type: 'refactor', section: '♻ Code Refactoring | 代码重构' },
];

/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    'subject-min-length': [0, 'always', 3],
    'subject-max-length': [0, 'always', 80],
    'type-enum': [0, 'always', metas.map((meta) => meta.type)],
  },
  prompt: {
    messages: {
      type: '请选择提交类型',
      subject: '请输入变更描述',
      breaking: '列举非兼容性重大的变更，如果有多行，使用 "|" 换行（选填项）\n',
      footer: '列举关联的 issue，例如：#31,#I3244（选填项）\n',
      confirmCommit: '确定提交',
    },
    types: metas.map((meta) => ({
      value: meta.type,
      name: `${`${meta.type}:`.padEnd(10, ' ')}${meta.section}`,
    })),
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: ['scope', 'body', 'footerPrefix'],
    formatMessageCB: (commit) =>
      `${commit?.defaultMessage}\n\nCo-authored-by: ${readGitUser(
        'name',
      )} <${readGitUser('email')}>`,
  },
};

function readGitUser(key) {
  return execSync(`git config user.${key}`)
    .toString()
    .replace(/(\r\n\t|\n|\r\t)/g, '');
}
