---
title: 请求拦截器
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
用于请求发出前拦截请求。

通常会用于转换请求配置，或实现一些自定义功能。
:::

## 添加请求拦截器

可以添加请求拦截器。

```ts
import axios from 'axios-miniprogram';

axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
```

也可以添加多个请求拦截器，后添加的会先执行。

```ts
import axios from 'axios-miniprogram';

// 先添加 后执行
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 后添加 先执行
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
```

## 移除请求拦截器

可以移除不再需要的请求拦截器。

```ts
import axios from 'axios-miniprogram';

const ejectId = axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 移除请求拦截器
axios.interceptors.request.eject(ejectId);
```

## 移除所有请求拦截器

可以移除所有请求拦截器。

```ts
import axios from 'axios-miniprogram';

axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 移除所有请求拦截器
axios.interceptors.request.clear();
```
