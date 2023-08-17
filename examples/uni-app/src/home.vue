<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios-miniprogram';
import consola from 'consola';

const config = ref<string>('');
const response = ref<string>('');
const error = ref<string>('');

axios.defaults.adapter = axios.createAdapter({
  request: uni.request as any,
  download: uni.downloadFile,
  upload: uni.uploadFile as any,
});
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.errorHandler = (err) => {
  consola.info('[debug err]', (err as any).response);
  error.value = `<pre>${JSON.stringify(err, null, 2)}</pre>`;
  uni.hideLoading();
  uni.showToast({
    icon: 'none',
    title: (err as any).response?.data?.errMsg || '未知错误',
  });
  return Promise.reject(err);
};

axios.use(async (ctx, next) => {
  consola.info('[debug req]', ctx.req);
  uni.showLoading({
    title: 'Loading...',
  });
  config.value = `<pre>${JSON.stringify(ctx.req, null, 2)}</pre>`;
  error.value = '';
  response.value = '';
  await next();
  consola.info('[debug res]', ctx.res);
  response.value = `<pre>${JSON.stringify(ctx.res, null, 2)}</pre>`;
  uni.hideLoading();
});

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
  uni.chooseImage({
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

defineExpose({
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  config,
  response,
  error,
});
</script>

<template>
  <view class="page">
    <button class="button" type="primary" @click="getRequest">GET 请求</button>
    <button class="button" type="primary" @click="postRequest">
      POST 请求
    </button>
    <button class="button" type="primary" @click="putRequest">PUT 请求</button>
    <button class="button" type="primary" @click="deleteRequest">
      DELETE 请求
    </button>
    <button class="button" type="primary" @click="downloadRequest">
      DOWNLOAD 请求
    </button>
    <button class="button" type="primary" @click="uploadRequest">
      UPLOAD 请求
    </button>
    <button class="button" type="primary" @click="errorRequest">
      ERROR 请求
    </button>
    <button class="button" type="primary" @click="failRequest">
      FAIL 请求
    </button>

    config:
    <view class="code" v-html="config"></view>

    response:
    <view class="code" v-html="response"></view>

    error:
    <view class="code" v-html="error"></view>
  </view>
</template>

<style>
.page {
  padding: 20px;
}

.button {
  margin: 20px 0;
}

.code {
  padding: 20px;
  overflow-x: scroll;
  white-space: pre;
}
</style>
