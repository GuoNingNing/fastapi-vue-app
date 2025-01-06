<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <HeaderBar />
    <!-- 轮播图 -->
    <BannerCarousel />
    <!-- 功能菜单 -->
    <MenuGrid />
    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import BannerCarousel from '@/components/BannerCarousel.vue';
import MenuGrid from '@/components/MenuGrid.vue';
import BottomNav from '@/components/BottomNav.vue';
</script>

<style>
.home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
