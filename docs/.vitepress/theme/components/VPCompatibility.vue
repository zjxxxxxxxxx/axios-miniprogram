<script setup lang="ts">
import { computed } from 'vue';
import { isString } from 'lodash-es';

type Support = boolean | string;
interface VPCompatibilityProps {
  wx?: Support;
  my?: Support;
  swan?: Support;
  tt?: Support;
  tt2?: Support;
  qq?: Support;
  ks?: Support;
  dd?: Support;
  jd?: Support;
}

const props = defineProps<VPCompatibilityProps>();

const metas = [
  { name: '微信小程序', id: 'wx' },
  { name: '支付宝小程序', id: 'my' },
  { name: '百度小程序', id: 'swan' },
  { name: '京东小程序', id: 'jd' },
  { name: '抖音小程序', id: 'tt' },
  { name: 'QQ 小程序', id: 'qq' },
  { name: '钉钉小程序', id: 'dd' },
  { name: '飞书小程序', id: 'tt2' },
  { name: '快手小程序', id: 'ks' },
];

const platforms = computed(() => {
  return metas.map(({ name, id }) => {
    const prop = props[id as keyof VPCompatibilityProps];
    const support = isString(prop) ? prop : prop ? '✓' : '✗ ';

    return {
      name,
      support,
    };
  });
});

defineExpose({
  platforms,
  props,
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>平台</th>
        <th>支持度</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="platform in platforms">
        <td style="text-align: left">{{ platform.name }}</td>
        <td style="text-align: left">{{ platform.support }}</td>
      </tr>
    </tbody>
  </table>
</template>
