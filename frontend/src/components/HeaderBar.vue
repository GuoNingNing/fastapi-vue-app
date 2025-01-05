<template>
  <van-nav-bar
    title="主页"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<script setup>
const onClickLeft = () => {
  console.log('返回按钮被点击');
};
</script>

<style>
/* 可根据需求自定义样式 */
</style>
