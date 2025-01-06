<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
}
import { onMounted } from 'vue'

onMounted(() => {
  // 页面加载后滚动 1px，防止 iOS/Android 浏览器地址栏显示
  window.scrollTo(0, 1)
})
</script>
