---
title: 发送请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
发送任意请求方法的 HTTP 请求。
:::

## 基础用法

可以直接传递 `url` 发送请求，默认发送的是 `GET` 方法请求。

```ts
import axios from 'axios-miniprogram';

axios
  .request('https://api.com/test')
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带请求配置

可以额外传递第二个参数 `config`，用于指定请求方法以及其他配置项。

```ts
import axios from 'axios-miniprogram';

axios
  .request('https://api.com/test', {
    method: 'POST', // 此时会发送 POST 方法请求
    data: {
      name: 'test',
      password: '123456',
    },
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 仅有请求配置

可以直接传递 `config` 发送请求。

```ts
import axios from 'axios-miniprogram';

axios
  .request({
    url: 'https://api.com/test/:id',
    params: {
      id: 1,
    },
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 说明

您可能发现 `axios.request()` 和 `axios()` 使用方式完全一致，为什么用法是一样的？

其实它们本就是同一个请求函数，`axios` 是基于 `axios.request` 添加了一系列工具函数改造而来，其目的是为了简化使用。
