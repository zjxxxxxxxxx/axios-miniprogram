# download

## 发送下载请求

可以从服务端下载文件本地，只有 get 请求才生效

```typescript
axios
  .get(
    '/file',
    {
      // 指定文件下载后存储的路径 (本地路径)，选填
      filePath: '',
    },
    {
      download: true,
    },
  )
  .then((response) => {
    // 用户文件路径 (本地路径)。传入 filePath 时会返回，跟传入的 filePath 一致
    response.data.filePath;
    // 用户文件路径 (本地临时路径)。
    response.data.tempFilePath;
  });
```
