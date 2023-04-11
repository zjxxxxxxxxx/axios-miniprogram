# paramsSerializer

## 自定义参数序列化`config.paramsSerializer`

可以使用自己的规则去序列化参数。

```typescript
axios('/user', {
  paramsSerializer: function paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'brackets',
    });
  },
});
```
