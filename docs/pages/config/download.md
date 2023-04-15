# download

## 发送下载请求

可以从服务端下载文件到本地

- 只有 get 请求才生效

```ts
axios
  .get(
    '/file',
    {
      // 指定文件下载后存储的路径 (本地路径)，选填
      filePath: '/file',
    },
    {
      download: true,
    },
  )
  .then((response) => {
    // 用户文件路径 (本地路径)。传递 filePath 时会返回，跟传递的 filePath 一致
    response.data.filePath;
    // 用户文件路径 (本地临时路径)。
    response.data.tempFilePath;
  });
```
