---
title: 上传文件
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
将本地资源上传到服务器，必须使用 `POST` 方法请求，并将请求配置的 `upload` 属性设置为 `true`。
:::

## 普通的上传请求

可以将本地资源上传到服务器。

```ts
import axios from 'axios-miniprogram';

axios
  .post(
    'https//api.com/test',
    {
      // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
      name: 'fileName',

      // 要上传文件资源的路径 (本地路径)
      filePath: '你的本地路径',
    },
    {
      upload: true,
    },
  )
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

axios
  .post(
    'https//api.com/test',
    {
      // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
      name: 'fileName',

      // 要上传文件资源的路径 (本地路径)
      filePath: '你的本地路径',

      // 这是额外的 formData 属性
      id: 1,

      // 这是额外的 formData 属性
      user: '123',
    },
    {
      upload: true,
    },
  )
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

axios
  .post(
    'https//api.com/test',
    {
      // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
      name: 'fileName',

      // 要上传文件资源的路径 (本地路径)
      filePath: '你的本地路径',

      // 这是额外的 formData 属性
      id: 1,

      // 这是额外的 formData 属性
      user: '123',
    },
    {
      upload: true,
      onUploadProgress(event) {
        const {
          // 上传进度
          progress,

          // 已经上传的数据长度
          totalBytesSent,

          // 预期需要上传的数据总长度
          totalBytesExpectedToSend,
        } = event;
      },
    },
  )
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
