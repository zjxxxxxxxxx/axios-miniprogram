---
title: 响应拦截器
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
用于 `response` 到达 `then` 之前，或 `error` 到达 `catch` 之前拦截响应。

通常会用于处理错误，但对于处理错误而言，使用 `errorhandler` 会是更好的选择。
:::

## 添加响应拦截器

可以添加响应拦截器。

```ts
import axios from 'axios-miniprogram';

axios.interceptors.response.use(
  function (response) {
    // 在 then 之前做些什么
    return response;
  },
  function (error) {
    // 在 catch 之前做些什么
    return Promise.reject(error);
  },
);
```

也可以添加多个响应拦截器，先添加的会先执行。

```ts
import axios from 'axios-miniprogram';

// 先添加 先执行
axios.interceptors.response.use(
  function (response) {
    // 在 then 之前做些什么
    return response;
  },
  function (error) {
    // 在 catch 之前做些什么
    return Promise.reject(error);
  },
);

// 后添加 后执行
axios.interceptors.response.use(
  function (response) {
    // 在 then 之前做些什么
    return response;
  },
  function (error) {
    // 在 catch 之前做些什么
    return Promise.reject(error);
  },
);
```

## 移除响应拦截器

可以移除不再需要的响应拦截器。

```ts
import axios from 'axios-miniprogram';

const ejectId = axios.interceptors.response.use(
  function (response) {
    // 在 then 之前做些什么
    return response;
  },
  function (error) {
    // 在 catch 之前做些什么
    return Promise.reject(error);
  },
);

// 移除响应拦截器
axios.interceptors.response.eject(ejectId);
```
