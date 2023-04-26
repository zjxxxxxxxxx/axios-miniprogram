---
title: 转换数据
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
请求发送前转换请求数据，响应到达 `then` 之前转换响应数据。
:::

## 转换请求数据

可以转换请求数据，只对允许携带请求数据的请求方法生效，允许携带请求数据的方法有：`POST`、`PUT`、`PATCH`。

```ts
import axios from 'axios-miniprogram';

axios('test', {
  method: 'POST',
  transformRequest(data, headers) {
    return JSON.stringify(data);
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

也支持多次转换。

```ts
import axios from 'axios-miniprogram';

axios('test', {
  method: 'POST',
  transformRequest: [
    (data, headers) => {
      return JSON.stringify(data);
    },
    (data, headers) => {
      return encodeURIComponent(data);
    },
  ],
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 全局转换请求数据

可以设置全局转换请求数据，对每个请求生效。

```ts
import axios from 'axios-miniprogram';

axios.defaults.transformRequest = (data, headers) => {
  return JSON.stringify(data);
};
```

## 转换响应数据

可以转换响应数据。

```ts
import axios from 'axios-miniprogram';

axios('test', {
  transformResponse(data, headers) {
    return JSON.parse(data);
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

也支持多次转换。

```ts
import axios from 'axios-miniprogram';

axios('test', {
  transformResponse: [
    (data, headers) => {
      return decodeURIComponent(data);
    },
    (data, headers) => {
      return JSON.parse(data);
    },
  ],
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 全局转换响应数据

可以设置全局转换响应数据，对每个请求生效。

```ts
import axios from 'axios-miniprogram';

axios.defaults.transformResponse = (data, headers) => {
  return JSON.parse(data);
};
```
