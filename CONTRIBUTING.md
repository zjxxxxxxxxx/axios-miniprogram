# 贡献

感谢您有兴趣为这个项目做出贡献！

## 发展

### 设置

将此 repo 克隆到本地计算机并安装依赖项。

```bash
pnpm install
```

我们使用 VitePress 进行快速开发和文档编制。可以通过以下方式在本地启动它。

```bash
pnpm docs:dev
```

我们使用 Vitest 进行单元测试。可以通过以下方式在本地启动它。

```bash
pnpm test:watch
```

我们使用 cz-git 交互式进行 git commit。

```bash
git add .
pnpm cz
```

脚本列表

- `pnpm build` 打包源代码
- `pnpm watch` 监听文件变更并运行 `build`
- `pnpm test` 单元测试
- `pnpm test:watch` 监听文件变更并运行 `test`
- `pnpm test:cov` 运行 `test` 并输出测试覆盖率
- `pnpm docs:dev` 启动开发环境的文档服务器

## 贡献

### 现有功能

随意增强现有功能。请尽量不要引入重大更改。

### 新功能

添加新功能有一些注意事项。

- 在你开始工作之前，最好先开一个 [issue](https://github.com/zjxxxxxxxxx/axios-miniprogram/issues) 来讨论。
- 应该对新功能进行单元测试。
- 应该在文档中添加相关的使用介绍及方法。

## 项目结构

```
src/            - 源代码
docs/           - 文档
test/           - 单元测试
scripts/        - 脚本及工具函数
```

## 代码风格

不用担心代码风格，只要安装好开发依赖即可。Git 钩子将在提交时为您格式化和修复它们。

## 谢谢

再次感谢您对本项目感兴趣！你太棒了！
