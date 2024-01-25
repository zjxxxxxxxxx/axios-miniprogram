---
title: 开始
---

# {{ $frontmatter.title }}

## 安装

:::: code-group

```bash [NPM]
$ npm install axios-miniprogram
```

```bash [YARN]
$ yarn add axios-miniprogram
```

```bash [PNPM]
$ pnpm install axios-miniprogram
```

::::

原生小程序也可以直接[下载源码包](https://github.com/zjxxxxxxxxx/axios-miniprogram/releases)，但是这样是失去类型提示和 `sourceMap` 定位功能。

建议在条件允许的情况下优先使用包管理工具安装的方式，而不是使用下载源码包的方式。

## 引用

可以在不同的模块系统导入需要用到的功能。

:::: code-group

```ts [ES Module]
import axios, {
  // 取消令牌
  CancelToken,

  // 判断取消请求错误
  isCancel,

  // 原始 Axios 类
  Axios,

  // 判断请求响应错误
  isAxiosError,

  // 创建平台适配器
  createAdapter,
} from 'axios-miniprogram';

axios('/test');
```

```ts [CommonJS]
const {
  // 静态对象
  // 注意：默认导出的 axios 在 CommonJS 里是以 default 属性的方式存在
  default: axios,

  // 取消令牌
  CancelToken,

  // 判断取消请求错误
  isCancel,

  // 原始 Axios 类
  Axios,

  // 判断请求响应错误
  isAxiosError,

  // 创建平台适配器
  createAdapter,
} = require('axios-miniprogram');

axios('/test');
```

::::

不同的模块系统存在一些小差异，`esm` 会自动处理默认导入，但 `cjs` 不会处理默认导入。

```ts
// 默认导入，esm 和 cjs 这两种写法是等价关系
import axios from 'axios-miniprogram';
const axios = require('axios-miniprogram').default;

// 别名导入，esm 和 cjs 这两种写法是等价关系
import * as axios from 'axios-miniprogram';
const axios = require('axios-miniprogram');

// 具名导入，esm 和 cjs 这两种写法是等价关系
import {
  default as axios,
  CancelToken,
  isCancel,
  Axios,
  isAxiosError,
  createAdapter,
} from 'axios-miniprogram';
const {
  default: axios,
  CancelToken,
  isCancel,
  Axios,
  isAxiosError,
  createAdapter,
} = require('axios-miniprogram');
```

## 使用

### `axios(url, config?)`

可以通过把 `url` 和 `config` 传递给 `axios` 来发送请求。

注意： `config` 为选填

```ts
import axios from 'axios-miniprogram';

// 默认发送 GET 请求
axios('https://api.com/test')
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });

// 发送 POST 请求
axios('https://api.com/test', {
  method: 'POST',
})
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });
```

### `axios(config)`

也可以直接把 `config` 传递给 `axios` 来发送请求。

```ts
import axios from 'axios-miniprogram';

// 默认发送 GET 请求
axios({
  url: 'https://api.com/test',
})
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });

// 发送 POST 请求
axios({
  url: 'https://api.com/test',
  method: 'POST',
})
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });
```

也可以使用请求方法简化请求。

- [axios.request(url, config?) | axios.request(config)](/basics/request)
- [axios.options(url, config?)](/method/OPTIONS)
- [axios.get(url, params?, config?)](/method/GET)
- [axios.head(url, params?, config?)](/method/HEAD)
- [axios.post(url, data?, config?)](/method/POST)
- [axios.put(url, data?, config?)](/method/PUT)
- [axios.patch(url, data?, config?)](/method/PATCH)
- [axios.delete(url, params?, config?)](/method/DELETE)
- [axios.trace(url, config?)](/method/TRACE)
- [axios.connect(url, config?)](/method/CONNECT)
