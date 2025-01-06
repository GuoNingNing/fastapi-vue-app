<template>
  <van-tabbar v-model="active" fixed>
    <van-tabbar-item
      to="/"
      icon="home-o"
      @click="navigate(0)"
    >
      聊天
    </van-tabbar-item>
    <van-tabbar-item
      to="/chat/settings"
      icon="setting-o"
      @click="navigate(1)"
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

const navigate = (index: number) => {
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
