<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <HeaderBar />
    <!--    &lt;!&ndash; 轮播图 &ndash;&gt;-->
    <!--    <BannerCarousel />-->
    <!--    &lt;!&ndash; 功能菜单 &ndash;&gt;-->
    <!--    <MenuGrid />-->
    <div class="container">
      <router-view />
    </div>
    <!-- 底部导航 -->
    <BottomNav class="bottom-nav" />
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

  .container {
    height: calc(100% - 100px);
  }

  .bottom-nav {
    height: 50px;
  }
}
</style>
