---
title: 下载文件
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
下载文件资源到本地。
:::

::: warning 注意
下载文件只能使用 `GET` 方法请求，并将配置项 `download` 设置为 `true`。
:::

## 普通的下载请求

可以下载文件资源到本地。

```ts
import axios from 'axios-miniprogram';

axios('https://api.com/test', {
  download: true,
})
  .then((response) => {
    const {
      // 临时文件路径 (本地路径)。没传入 filePath 指定文件存储路径时会返回，下载后的文件会存储到一个临时文件
      tempFilePath,
    } = response;
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带参数的下载请求

可以指定文件下载后存储的路径 (本地路径)。

```ts
import axios from 'axios-miniprogram';

axios('https://api.com/test', {
  download: true,
  params: {
    filePath: '你的本地路径',
  },
})
  .then((response) => {
    const {
      // 指定文件下载后存储的路径 (本地路径)
      filePath,
    } = response;
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 监听下载进度

可以监听下载进度变化。

```ts
import axios from 'axios-miniprogram';

axios('https://api.com/test', {
  download: true,
  params: {
    filePath: '你的本地路径',
  },
  onDownloadProgress(event) {
    const {
      // 下载进度百分比
      progress,

      // 已经下载的数据长度，单位 Bytes
      totalBytesWritten,

      // 预预期需要下载的数据总长度，单位 Bytes
      totalBytesExpectedToWrite,
    } = event;
  },
})
  .then((response) => {
    const {
      // 指定文件下载后存储的路径 (本地路径)
      filePath,
    } = response;
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```
