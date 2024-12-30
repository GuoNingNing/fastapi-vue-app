<template>
  <div class="chat-container">
    <div class="chat-window">
      <ChatMessage v-for="message in messages" :key="message.id" :message="message"/>
    </div>
    <ChatInput @sendMessage="sendMessage"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ChatMessage from '@/components/chat/ChatMessage.vue';
import ChatInput from '@/components/chat/ChatInput.vue';

const c = `
# Hello World

This is a paragraph with some **bold** text and [a link](https://example.com).

\`\`\`javascript
function helloWorld() {
  console.log("Hello, World!");
}
\`\`\`
`

const messages = ref<{ id: number; text: string; sender: string }[]>([{
  id: Date.now(),
  text: c,
  sender: 'bot'
}]);

// 发送消息
const sendMessage = (message: string) => {
  messages.value.push({id: Date.now(), text: message, sender: 'user'});
  // 假设后台返回聊天消息
  setTimeout(() => {
    messages.value.push({id: Date.now(), text: `你说了：${message}`, sender: 'bot'});
  }, 1000);
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
}

.chat-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
