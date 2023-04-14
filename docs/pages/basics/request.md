---
title: 发送请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
发送任意请求方法的 HTTP 请求。
:::

## 基础用法

您可以直接传入 `url` 发送请求，默认发送的是 `GET` 方法请求。

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

## 携带自定义配置

您也可以传入第二个参数 `config`，用于指定请求方法以及其他配置项。

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

## 仅有自定义配置

您也可以忽略以上示例，直接传入 `config` 发送请求。

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
