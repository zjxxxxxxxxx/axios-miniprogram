# Axios

## `axios.Axios`

`axios.Axios`是一个类，其实`axios`就是`axios.Axios`类的实例改造而来的，`axios.create(defaults)`创建的也是`axios.Axios`的实例。

直接实例化`axios.Axios`可以得到一个`原始实例`，不能当函数调用，传入的自定义配置就是`原始实例`的默认配置，而不会像`axios.create(defaults)`一样去合并`axios`中的默认配置。

```typescript
const instance = new axios.Axios({
  beseURL: 'https://www.api.com',
  params: {
    id: 1,
  },
});

instance.get('/user');
// 'https://www.api.com/user?id=1'
```
