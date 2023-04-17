---
title: 动态地址
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
简化设置地址参数。
:::

## 设置 `params` 动态参数

可以设置属性 `params`，最终会从 `params` 中获取到对应的值。

::: warning 注意
获取到值之后，会从 `params` 中删除对应的属性。
:::

```ts
import axios from 'axios-miniprogram';

// 请求的服务端地址 https://api.com/1
// 获取到 id 之后，会从 params 中删除 id
axios('https://api.com/:id', {
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

## 设置 `data` 动态参数

可以设置属性 `data`，最终会从 `data` 中获取到对应的值。

```ts
import axios from 'axios-miniprogram';

// 请求的服务端地址 https://api.com/1
// 获取到 id 之后，不会从 data 中删除 id
axios('https://api.com/:id', {
  method: 'POST',
  data: {
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

## 同时设置 `params` 和 `data`

可以同时设置 `params` 和 `data`，会优先从 `params` 中获取对应的值。

```ts
import axios from 'axios-miniprogram';

// 请求的服务端地址 https://api.com/1
axios('https://api.com/:id', {
  method: 'POST',
  params: {
    id: 1,
  },
  data: {
    id: 2,
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });

// 请求的服务端地址 https://api.com/1/2
axios('https://api.com/:id1/:id2', {
  method: 'POST',
  params: {
    id1: 1,
  },
  data: {
    id2: 2,
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```
