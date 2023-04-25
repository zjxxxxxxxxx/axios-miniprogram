---
title: 中间件
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
洋葱模型中间件。
:::

```ts
import axios from 'axios-miniprogram';

axios.use(async (ctx, next) => {
  console.log('start1');
  await next();
  console.log('end1');
});

axios.use(async (ctx, next) => {
  console.log('start2');
  await next();
  console.log('end2');
});

// start1 -> start2 -> /test -> end2 -> end1
axios('/test');
```

未完待续。。。
