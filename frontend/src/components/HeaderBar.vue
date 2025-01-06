<template>
  <van-nav-bar
    :title="title"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const title = ref(''); // 初始化 title 为空
const route = useRoute(); // 获取当前路由信息

// 监听路由变化，并根据路由动态设置标题
watchEffect(() => {
  // 可以根据路由的名称、路径等设置不同的标题
  title.value = route.name;
});

const onClickLeft = () => {
  console.log('返回按钮被点击');
};
</script>

<style>
/* 可根据需求自定义样式 */
</style>
