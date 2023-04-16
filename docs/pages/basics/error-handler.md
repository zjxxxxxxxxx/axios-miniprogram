---
title: 错误处理
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
当请求失败时，可以对错误进行处理。
:::

## 使用 `validateStatus` 抛出错误

可以使用 `validateStatus` 自定义抛出错误的 HTTP code。

```ts
import axios from 'axios-miniprogram';

axios('https://api.com/test', {
  validateStatus(status) {
    // status 小于 200 大于 299 会抛出错误
    return status >= 200 && status < 300;
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 在 `catch` 中处理错误

可以处理不同类型的错误。

```ts
import axios from 'axios-miniprogram';

axios('https://api.com/test')
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    if (axios.isAxiosError(error)) {
      // 响应错误

      const {
        // 错误消息
        message,

        // 请求配置
        config,

        // 请求任务，也就是请求函数返回的结果
        request,

        // 响应体
        response,
      } = error;

      if (response.isFail) {
        // 平台或适配器错误
      } else {
        // 使用 `validateStatus` 自定义抛出的错误
      }
    } else if (axios.isCancel(error)) {
      // 取消请求
    } else {
      // 其他错误
    }
  });
```

## 使用 `errorHandler` 处理错误

可以使用 `errorHandler` 处理不同类型的错误。

```ts
import axios from 'axios-miniprogram';

axios('https://api.com/test', {
  errorHandler(error) {
    if (axios.isAxiosError(error)) {
      // 响应错误

      const {
        // 错误消息
        message,

        // 请求配置
        config,

        // 请求任务，也就是请求函数返回的结果
        request,

        // 响应体
        response,
      } = error;

      if (response.isFail) {
        // 平台或适配器错误
      } else {
        // 使用 `validateStatus` 自定义抛出的错误
      }
    } else if (axios.isCancel(error)) {
      // 取消请求
    } else {
      // 其他错误
    }
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```
