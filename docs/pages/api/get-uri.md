# getUri

## `axios.getUri(config)`

根据配置中的`url`和`params`生成一个`URI`。

```ts
const uri = axios.getUri({
  url: '/user',
  params: {
    id: 1,
  },
});
// '/user?id=1'
```
