---
title: 参数系列化
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
支持自定义参数系列化器。
:::

## 自定义参数系列化器

可以用自己的方式系列化参数。

```ts
import axios from 'axios-miniprogram';
import qs from 'qs';

axios('https://api.com', {
  params: {
    id: 1,
  },
  paramsSerializer(params) {
    return qs.stringify(params);
  },
})
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });
```
