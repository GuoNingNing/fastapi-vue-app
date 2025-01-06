<template>
  <div class="chat-page">
    <!-- 聊天区域 -->
    <div class="chat-content" ref="chatContent">
      <ChatBubble
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      />
    </div>

    <!-- 底部输入框和工具栏 -->
    <MessageInput :loading="loading" @send="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useChatStore } from './chatStore';
import ChatBubble from './components/ChatBubble.vue';
import Loading from './components/Loading.vue';
import MessageInput from './components/MessageInput.vue';
import { showToast } from 'vant';
import { get, stream } from '@/http';
import { ref, nextTick, reactive } from 'vue';


const router = useRouter();

const chatStore = useChatStore();
chatStore.loadMessages();
const messages = chatStore.messages;
const loading = ref(false);
const chatContent = ref(null);

const goToSettings = () => {
  console.log('跳转到设置页面');
  router.push('/chat/settings');
};

const sendMessage = async (text: string) => {
  loading.value = true;
  await chatStore.addMessage({ role: 'user', content: text });
  const replay = reactive({
    role: 'gpt',
    content: '',
    timestamp: 0
  });
  await chatStore.addMessage(replay);

  stream('POST', '/gpt/ask', (data) => {
      replay.content += data;
      chatContent.value.scrollTop = chatContent.value.scrollHeight;
    },
    { content: text, stream: true }
  ).finally(() => {
    replay.timestamp = Date.now();
    chatStore.saveMessages();
    chatContent.value.scrollTop = chatContent.value.scrollHeight;
    loading.value = false;
  });
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
