<template>
  <div class="toolbar">
    <!-- 左侧按钮，触发 themeChange 事件 -->
    <div class="left">
      <van-icon name="lightning" @click="changeTheme" />
    </div>

    <!-- 中间标题 -->
    <div class="title">
      <slot name="title">默认标题</slot>
    </div>

    <!-- 右侧按钮，触发 feedback 事件 -->
    <div class="right">
      <van-icon name="chat" @click="giveFeedback" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

// 定义事件
const emit = defineEmits(['themeChange', 'feedback']);

// 切换主题的事件处理函数
const changeTheme = () => {
  emit('themeChange');
};

// 反馈的事件处理函数
const giveFeedback = () => {
  emit('feedback');
};
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.left, .right {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.title {
  flex-grow: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

.van-icon {
  font-size: 24px;
  color: #333;
}

.van-icon:hover {
  color: #007bff;
}
</style>
