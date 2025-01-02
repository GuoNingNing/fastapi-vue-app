<template>
  <div :class="['chat-message', message.role]">
    <div class="avatar" v-if="isAvatarValid">
      <img
        :src="message.role === 'user' ? userAvatar : botAvatar"
        alt="Avatar"
        @error="handleAvatarError"
      />
    </div>
    <div class="fallback-avatar" v-else>
      <span>{{ message.role.charAt(0).toUpperCase() }}</span> <!-- 只显示首字母 -->
    </div>
    <MarkdownRander :content="message.content"/>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from 'vue';
import MarkdownRander from "@/components/MarkdownRander.vue";
import type { Message } from '@/types/chat.ts';
const props = defineProps<{ message: Message }>();

const userAvatar = 'path/to/user-avatar.png'; // 用户头像路径
const botAvatar = 'path/to/bot-avatar.png';   // 机器人头像路径

const isAvatarValid = ref(true); // 跟踪头像是否有效

// 处理头像加载错误
function handleAvatarError() {
  isAvatarValid.value = false; // 设置为 false 表示头像加载失败
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column; /* 垂直布局聊天消息 */
  padding: 10px;
}

.chat-message {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex; /* 使用 flexbox 布局 */
  align-items: center; /* 垂直居中 */
}

.avatar {
  width: 30px; /* 头像的宽度 */
  height: 30px; /* 头像的高度 */
  margin-right: 10px; /* 头像和文本之间的间距 */
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* 圆形头像 */
}

.fallback-avatar {
  width: 30px; /* 背景头像的宽度 */
  height: 30px; /* 背景头像的高度 */
  border-radius: 50%; /* 圆形背景 */
  background-color: #d1f0ff; /* 自定义背景色 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  margin: 0 10px; /* 头像和文本之间的间距 */
  color: #000; /* 文本颜色 */
}

.chat-message.user {
  background-color: #d3d6d9;
  text-align: right; /* 用户消息对齐右侧 */
  flex-direction: row-reverse; /* 头像在右侧 */

  .fallback-avatar {
    background-color: #e5eecf; /* 自定义背景色 */
  }
}

.chat-message.bot {
  background-color: #f0f0f0;
  text-align: left; /* 机器人消息对齐左侧 */
}
</style>
