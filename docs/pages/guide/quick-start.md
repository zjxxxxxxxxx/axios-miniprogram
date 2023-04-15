---
title: 开始
---

# {{ $frontmatter.title }}

## 安装

:::: code-group

```bash [NPM]
$ npm install -D axios-miniprogram
```

```bash [YARN]
$ yarn add -D axios-miniprogram
```

```bash [PNPM]
$ pnpm install -D axios-miniprogram
```

::::

[原生小程序也可以直接下载源码包](https://github.com/zjx0905/axios-miniprogram/releases)

## 引用

:::: code-group

```ts [ES Module]
import axios from 'axios-miniprogram';

axios('test');
```

```ts [CommonJS]
const axios = require('axios-miniprogram').default;

axios('test');
```

::::

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
- [axios.options(url, config?)](/request/OPTIONS)
- [axios.get(url, params?, config?)](/request/GET)
- [axios.head(url, params?, config?)](/request/HEAD)
- [axios.post(url, data?, config?)](/request/POST)
- [axios.put(url, data?, config?)](/request/PUT)
- [axios.patch(url, data?, config?)](/request/PATCH)
- [axios.delete(url, params?, config?)](/request/DELETE)
- [axios.trace(url, config?)](/request/TRACE)
- [axios.connect(url, config?)](/request/CONNECT)

还提供了一系列工具方法。

- `axios.create(defaults?)` 创建新的 `axios` 实例
- `axios.createAdapter(platform)` 创建平台适配器
- `axios.isCancel(error)` 判断异常是否来自取消请求
- `axios.isAxiosError(error)` 判断异常是否来自请求响应
