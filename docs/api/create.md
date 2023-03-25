# create

## `axios.create(defaults)`

创建一个`自定义实例`，传入的自定义默认配置`defaults`会和`axios`的默认配置`axios.defaults`合并成`自定义实例`的默认配置。

`自定义实例`拥有和`axios`相同的调用方式和请求方法的别名。

```typescript
axios.defaults.baseURL = 'https://www.api.com';

const instance = axios.create({
  params: {
    id: 1,
  },
});

instance('/user');
// 'https://www.api.com/user?id=1'
```
