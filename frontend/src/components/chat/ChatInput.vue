<template>
  <div class="chat-input">
    <input v-model="inputText" @keyup.enter="handleSend" placeholder="Type a message..." />
    <button @click="handleSend">Send</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义输入框的值
const inputText = ref('');

// 定义发送消息的事件
const emit = defineEmits<{
  (event: 'ask', message: string): void;
}>();

// 发送消息的处理函数
const handleSend = () => {
  if (inputText.value.trim()) {
    emit('ask', inputText.value.trim()); // 触发 sendMessage 事件
    inputText.value = ''; // 清空输入框
  }
};
</script>

<style scoped>
.chat-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-input input {
  width: 80%;
  padding: 10px;
  border-radius: 5px;
}

.chat-input button {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
}
</style>
