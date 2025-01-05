<template>
  <div :class="['chat-message', message.role]">
    <MarkdownRander :id="'md_' + index" :content="message.content"/>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import MarkdownRander from "@/components/MarkdownRander.vue";
import type {Message} from '@/types/chat.ts';

defineProps<{ index: number, message: Message }>();

</script>

<style scoped>

.chat-message {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex; /* 使用 flexbox 布局 */
}

.chat-message.user {
  margin-left: 50px;
  background-color: #f5f4f4;
  text-align: right; /* 用户消息对齐右侧 */
  flex-direction: row-reverse; /* 头像在右侧 */
}

.fallback-avatar {
  width: 50px; /* 背景头像的宽度 */
  height: 50px; /* 背景头像的高度 */
  border-radius: 50%; /* 圆形背景 */
  background-color: #d1f0ff; /* 自定义背景色 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  margin: 0 10px; /* 头像和文本之间的间距 */
  color: #000; /* 文本颜色 */
}


</style>
