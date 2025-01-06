<template>
  <div v-if="visible" class="loading-overlay">
    <div class="loading-spinner"></div>
    <div class="loading-text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

// 接收父组件传递的参数
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  text: {
    type: String,
    default: '加载中...'
  }
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;  /* 确保 loading 层级足够高 */
}

.loading-spinner {
  border: 4px solid #f3f3f3;  /* 轻灰色背景 */
  border-top: 4px solid #3498db;  /* 动画的蓝色 */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 10px;
  color: white;
  font-size: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
