# transformRequest

## `config.transformRequest`自定义转换请求数据

可以在请求发出之前转换请求数据。

```ts
axios('/user', {
  transformRequest: [
    function transformRequest(data, headers) {
      // 转换请求数据
      return data;
    },
  ],
});
```
