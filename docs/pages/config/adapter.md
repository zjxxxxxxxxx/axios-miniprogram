# adapter

## 自定义平台适配器`config.adapter`

您可以手动适配当前所处的平台。

```ts
axios.defaults.adapter = function adapter(adapterConfig) {
  const {
    // 请求类型
    type,
    // 请求地址
    url,
    // 请求方法
    method,
    // 请求参数
    params,
    // 请求数据
    data,
    // 请求头 同 headers
    headers,
    // 响应数据格式
    dataType,
    // 响应数据类型
    responseType,
    // 超时时间
    timeout,
    // 成功的回调函数
    success,
    // 失败的回调函数
    fail,
  } = adapterConfig;

  // 在 adapterConfig 中选择您需要的参数发送请求
  switch (type) {
    case 'request': // 数据请求
      return wx.request({
        url,
        method,
        data,
        header: headers,
        success,
        fail,
      });
    case 'upload': // 上传
      return wx.uploadFile({
        url,
        method,
        formData: data,
        header: headers,
        success,
        fail,
      });
    case 'download': //  下载
      return wx.downloadFile({
        url,
        method,
        filePath: params.filePath,
        header: headers,
        success,
        fail,
      });
  }
};
```
