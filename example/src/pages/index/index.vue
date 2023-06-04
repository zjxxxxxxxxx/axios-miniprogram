<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios-miniprogram';

const config = ref<string>('');
const response = ref<string>('');
const error = ref<string>('');

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.errorHandler = (err) => {
  error.value = `<pre>${JSON.stringify(err, null, 4)}</pre>`;
  return Promise.reject(err);
};
axios.use(async (ctx, next) => {
  config.value = `<pre>${JSON.stringify(ctx.req, null, 4)}</pre>`;
  await next();
  response.value = `<pre>${JSON.stringify(ctx.res, null, 4)}</pre>`;
});

function getRequest() {
  axios.get('/users/:id', {
    id: 1,
  });
}

function postRequest() {
  axios.post(
    '/users',
    '{"name":"Leanne Graham","username":"Bret","email":"Sincere@april.biz","address":{"street":"Kulas Light","suite":"Apt. 556","city":"Gwenborough","zipcode":"92998-3874","geo":{"lat":"-37.3159","lng":"81.1496"}},"phone":"1-770-736-8031 x56442","website":"hildegard.org","company":{"name":"Romaguera-Crona","catchPhrase":"Multi-layered client-server neural-net","bs":"harness real-time e-markets"}}',
  );
}

function putRequest() {
  axios.put(
    '/users/:id',
    '{"id":1,"name":"Leanne Graham","username":"Bret","email":"Sincere@april.biz","address":{"street":"Kulas Light","suite":"Apt. 556","city":"Gwenborough","zipcode":"92998-3874","geo":{"lat":"-37.3159","lng":"81.1496"}},"phone":"1-770-736-8031 x56442","website":"hildegard.org","company":{"name":"Romaguera-Crona","catchPhrase":"Multi-layered client-server neural-net","bs":"harness real-time e-markets"}}',
  );
}

function deleteRequest() {
  axios.delete('/users/:id', {
    id: 1,
  });
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
  <view>
    <button class="button" type="primary" @click="getRequest">GET 请求</button>
    <button class="button" type="primary" @click="postRequest">
      POST 请求
    </button>
    <button class="button" type="primary" @click="putRequest">PUT 请求</button>
    <button class="button" type="primary" @click="deleteRequest">
      DELETE 请求
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
.button {
  margin: 20px;
}

.code {
  padding: 20px;
  overflow-x: scroll;
  white-space: pre;
}
</style>
