<template>
  <van-swipe autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(img, index) in images" :key="index">
      <img :src="img" class="banner-image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import { ref } from 'vue';

const images = ref([
  'https://via.placeholder.com/350x150?text=Slide+1',
  'https://via.placeholder.com/350x150?text=Slide+2',
  'https://via.placeholder.com/350x150?text=Slide+3',
]);
</script>

<style>
.banner-image {
  width: 100%;
  height: auto;
}
</style>
