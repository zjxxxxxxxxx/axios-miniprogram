import { View, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import axios, { createAdapter } from 'axios-miniprogram';
import { consola } from 'consola';

import './home.css';

export default function Home() {
  const [config, setConfig] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios.defaults.adapter = createAdapter({
      request: Taro.request,
      download: Taro.downloadFile,
      upload: Taro.uploadFile,
    } as any);
    axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
    axios.defaults.errorHandler = (err) => {
      consola.info('[debug err]', (err as any).response);
      setError(`<pre>${JSON.stringify(err, null, 2)}</pre>`);
      Taro.hideLoading();
      Taro.showToast({
        icon: 'none',
        title: (err as any).response?.data?.errMsg || '未知错误',
      });
      return Promise.reject(err);
    };
    axios.use(async (ctx, next) => {
      consola.info('[debug req]', ctx.req);
      Taro.showLoading({
        title: 'Loading...',
      });
      setConfig(`<pre>${JSON.stringify(ctx.req, null, 2)}</pre>`);
      setError('');
      setResponse('');
      await next();
      consola.info('[debug res]', ctx.res);
      setResponse(`<pre>${JSON.stringify(ctx.res, null, 2)}</pre>`);
      Taro.hideLoading();
    });
  }, []);

  function getRequest() {
    axios.get('/users/:id', {
      id: 1,
    });
  }

  function postRequest() {
    axios.post('/users', {
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: { lat: '-37.3159', lng: '81.1496' },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    });
  }

  function putRequest() {
    axios.put('/users/:id', {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: { lat: '-37.3159', lng: '81.1496' },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    });
  }

  function deleteRequest() {
    axios.delete('/users/:id', {
      id: 1,
    });
  }

  function downloadRequest() {
    axios.get(
      '/users/:id',
      {
        id: 1,
      },
      {
        download: true,
      },
    );
  }

  function uploadRequest() {
    Taro.chooseImage({
      count: 1,
      success({ tempFilePaths }) {
        axios.post(
          '/users',
          {
            name: 'filename',
            filePath: tempFilePaths[0],
            fileType: 'image',
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            upload: true,
          },
        );
      },
    });
  }

  function errorRequest() {
    axios.get('/users/:id', {
      id: -1,
    });
  }

  function failRequest() {
    axios.get(
      '/users',
      {},
      {
        timeout: 0,
      },
    );
  }

  return (
    <View className="page">
      <Button className="button" type="primary" onClick={getRequest}>
        GET 请求
      </Button>
      <Button className="button" type="primary" onClick={postRequest}>
        POST 请求
      </Button>
      <Button className="button" type="primary" onClick={putRequest}>
        PUT 请求
      </Button>
      <Button className="button" type="primary" onClick={deleteRequest}>
        DELETE 请求
      </Button>
      <Button className="button" type="primary" onClick={downloadRequest}>
        DOWNLOAD 请求
      </Button>
      <Button className="button" type="primary" onClick={uploadRequest}>
        UPLOAD 请求
      </Button>
      <Button className="button" type="primary" onClick={errorRequest}>
        ERROR 请求
      </Button>
      <Button className="button" type="primary" onClick={failRequest}>
        FAIL 请求
      </Button>
      config:
      <View
        className="code"
        dangerouslySetInnerHTML={{
          __html: config,
        }}
      ></View>
      response:
      <View
        className="code"
        dangerouslySetInnerHTML={{
          __html: response,
        }}
      ></View>
      error:
      <View
        className="code"
        dangerouslySetInnerHTML={{
          __html: error,
        }}
      ></View>
    </View>
  );
}
