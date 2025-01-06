<template>
  <div class="chat-page">
    <!-- 聊天区域 -->
    <div class="chat-content" ref="chatContent">
      <ChatBubble
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      />
      <Loading :visible="loading" text="加载中，请稍后..." />
    </div>

    <!-- 底部输入框和工具栏 -->
    <MessageInput @send="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useChatStore } from './chatStore';
import ChatBubble from './components/ChatBubble.vue';
import Loading from './components/Loading.vue';
import MessageInput from './components/MessageInput.vue';
import { showToast } from 'vant';
import { get } from '@/http';


const router = useRouter();

const chatStore = useChatStore();
chatStore.loadMessages();
const messages = chatStore.messages;
const loading = chatStore.loading;


const goToSettings = () => {
  console.log('跳转到设置页面');
  router.push('/chat/settings');
};

const sendMessage = async (text: string, callback: () => void) => {
  await chatStore.addMessage({ role: 'user', content: text });
  chatStore.fetchGPTReply(text).finally(() => callback());
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
  height: 100%;
  background-color: #EDEDED;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 5px;
}
</style>
