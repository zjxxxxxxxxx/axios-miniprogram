---
title: 上传文件
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
将本地资源上传到服务器。
:::

::: warning 注意
上传文件只能使用 `POST` 方法请求，并将请求配置项 `upload` 设置为 `true`。
:::

## 普通的上传请求

可以将本地资源上传到服务器。

```ts
import axios from 'axios-miniprogram';

axios('https://api.com/test', {
  method: 'POST',
  upload: true,
  data: {
    // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
    name: 'fileName',

    // 要上传文件资源的路径 (本地路径)
    filePath: '你的本地路径',
  },
})
  .then((response) => {
    const {
      // 开发者服务器返回的数据
      data,
    } = response;
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带 `formData` 的上传请求

也可以携带额外的 `formData` 发送给服务端。

```ts
import axios from 'axios-miniprogram';

axios('https://api.com/test', {
  method: 'POST',
  upload: true,
  data: {
    // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
    name: 'fileName',

    // 要上传文件资源的路径 (本地路径)
    filePath: '你的本地路径',

    // 这是额外的 formData 属性
    id: 1,

    // 这是额外的 formData 属性
    user: '123',
  },
})
  .then((response) => {
    const {
      // 开发者服务器返回的数据
      data,
    } = response;
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 监听上传进度

也可以监听上传进度变化。

```ts
import axios from 'axios-miniprogram';

axios('https://api.com/test', {
  method: 'POST',
  upload: true,
  data: {
    // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
    name: 'fileName',

    // 要上传文件资源的路径 (本地路径)
    filePath: '你的本地路径',

    // 这是额外的 formData 属性
    id: 1,

    // 这是额外的 formData 属性
    user: '123',
  },
  onUploadProgress(event) {
    const {
      // 上传进度百分比
      progress,

      // 已经上传的数据长度，单位 Bytes
      totalBytesSent,

      // 预期需要上传的数据总长度，单位 Bytes
      totalBytesExpectedToSend,
    } = event;
  },
})
  .then((response) => {
    const {
      // 开发者服务器返回的数据
      data,
    } = response;
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```
