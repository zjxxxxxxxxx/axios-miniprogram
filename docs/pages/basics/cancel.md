---
title: 取消请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
用于取消不再需要响应的请求。
:::

## 取消请求

可以创建一个 `CancelToken` 实例用来取消请求。

```ts
import axios from 'axios-miniprogram';
let cancel;

axios('https://api.com/test', {
  cancelToken: new axios.CancelToken((c) => {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  }),
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });

// 取消请求
cancel('request canceled');
```

## 工厂方法

也可以用 `CancelToken.source` 工厂方法创建 `CancelToken` 实例用来取消请求。

```ts
import axios from 'axios-miniprogram';
const { cancel, token } = axios.CancelToken.source();

axios('https://api.com/test', {
  cancelToken: token,
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });

// 取消请求
cancel('request canceled');
```

## 判断异常是否来自取消请求

也可以用 `axios.isCancel` 判断异常是否来自取消请求，从而做出相应的处理。

```ts
import axios from 'axios-miniprogram';
const { cancel, token } = axios.CancelToken.source();

axios('https://api.com/test', {
  cancelToken: token,
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    if (axios.isCancel(error)) {
      console.log(error, '请求已被取消');
    }
  });

// 取消请求
cancel('request canceled');
```
