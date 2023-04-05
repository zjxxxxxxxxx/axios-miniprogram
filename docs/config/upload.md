# upload

## 发送上传请求

可以上传文件到服务端，只有 post 请求才生效

```typescript
axios.post(
  '/file',
  {
    // 文件名称，必填
    fileName: 'image.png',
    // 文件路径，必填
    filePath: '/file/image.png',
    // 文件类型，选填
    fileType: 'image' | 'video' | 'audio';
    // 可以传入更多自定义字段，这些自定义字段最终会以 formData 的形式发送给服务端 (前提是平台支持)
    custom1: 'name',
    custom2: 'id'
  },
  {
    upload: true,
  },
);
```
