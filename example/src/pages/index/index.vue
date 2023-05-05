<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import './index.css'

const msg = ref('Hello world')

defineExpose({
  msg,
})
</script>
