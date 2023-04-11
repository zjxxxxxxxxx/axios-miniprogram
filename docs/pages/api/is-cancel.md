# isCancel

## `axios.isCancel`是否取消

可以判断当前错误是否来自取消请求

```typescript
axios('/user').catch((error) => {
  if (axios.isCancel(error)) {
    // 请求被取消了
  }
});
```
