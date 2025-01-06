<template>
  <van-tabbar v-model="active" fixed>
    <van-tabbar-item
      to="/"
      icon="home-o"
      @click="navigate(0)"
    >
      首页
    </van-tabbar-item>
    <van-tabbar-item
      to="/chat"
      icon="search"
      @click="navigate(1)"
    >
      聊天
    </van-tabbar-item>
    <van-tabbar-item
      to="/about"
      icon="about-o"
      @click="navigate(2)"
    >
      好友
    </van-tabbar-item>
    <van-tabbar-item
      to="/settings"
      icon="setting-o"
      @click="navigate(3)"
    >
      设置
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const active = ref(0);
const route = useRoute();

const navigate = (index) => {
  active.value = index;
};
</script>

<style scoped>
.van-tabbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #eaeaea;
}
</style>
