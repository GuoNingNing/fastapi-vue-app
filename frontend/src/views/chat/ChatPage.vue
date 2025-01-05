<template>
  <div class="chat-page">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="ChatGPT"
      left-text="历史记录"
      right-text="设置"
      @click-left="goToHistory"
      @click-right="goToSettings"
    />

    <!-- 聊天区域 -->
    <div class="chat-content" ref="chatContent">
      <ChatBubble
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      />
      <Loading v-if="loading" />
    </div>

    <!-- 底部输入框和工具栏 -->
    <MessageInput @send="sendMessage" />
    <Toolbar @themeChange="toggleTheme" @feedback="openFeedback" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useChatStore } from './chatStore';
import ChatBubble from './components/ChatBubble.vue';
import Loading from './components/Loading.vue';
import MessageInput from './components/MessageInput.vue';
import Toolbar from './components/Toolbar.vue';

const chatStore = useChatStore();
const messages = chatStore.messages;
console.log('messages',JSON.stringify(messages));
const loading = chatStore.loading;

const goToHistory = () => {
  console.log('跳转到历史记录');
};

const goToSettings = () => {
  console.log('跳转到设置页面');
};

const sendMessage = async (text) => {
  await chatStore.addMessage({ role: 'user', content: text });
  await chatStore.fetchGPTReply(text);
};

const toggleTheme = () => {
  console.log('切换主题');
};

const openFeedback = () => {
  console.log('打开反馈窗口');
};
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: var(--van-background);
}
</style>
