<template>
  <van-grid :column-num="4">
    <van-grid-item v-for="(item, index) in menuItems" :key="index" :text="item.text" :icon="item.icon" />
  </van-grid>
</template>

<script setup lang="ts">
const menuItems = [
  { text: '功能 1', icon: 'home-o' },
  { text: '功能 2', icon: 'search' },
  { text: '功能 3', icon: 'setting-o' },
  { text: '功能 4', icon: 'like-o' },
];
</script>

<style>
/* 可根据需求调整样式 */
</style>
