<template>
  <div class="chat-page">
    <van-nav-bar title="ChatGpt" left-arrow @click-left="showDrawer = true">
      <template #left>
        <van-icon name="more-o" size="18" />
      </template>
    </van-nav-bar>
    <!-- 聊天区域 -->
    <div class="chat-content" ref="chatContent">
      <ChatBubble v-for="(message, index) in messages" :key="index" :message="message" />
    </div>
    <!-- 底部输入框和工具栏 -->
    <MessageInput :loading="loading" @send="sendMessage" />
    <!-- 使用封装的 SideMenu 组件 -->
    <SideMenu v-model:show="showDrawer">
      <span @click="chatStore.clearMessages()">清除历史</span>
    </SideMenu>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useChatStore } from './chatStore'
import ChatBubble from './components/ChatBubble.vue'
import MessageInput from './components/MessageInput.vue'
import { stream } from '@/http'
import { reactive, ref } from 'vue'
import SideMenu from '@/views/chat/components/SideMenu.vue'


const router = useRouter()

const chatStore = useChatStore()
chatStore.loadMessages()
const messages = chatStore.messages
const loading = ref(false)

const chatContent = ref(null)

const sendMessage = async (text: string) => {
  loading.value = true
  await chatStore.addMessage({ role: 'user', content: text })
  const replay = reactive({
    role: 'gpt',
    content: '',
    timestamp: 0
  })
  await chatStore.addMessage(replay)

  stream('POST', '/gpt/ask', (data) => {
      replay.content += data
      chatContent.value.scrollTop = chatContent.value.scrollHeight
    },
    { content: text, stream: true }
  ).finally(() => {
    replay.timestamp = Date.now()
    chatStore.saveMessages()
    chatContent.value.scrollTop = chatContent.value.scrollHeight
    loading.value = false
  })
}


const showDrawer = ref(false)

</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #EDEDED;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 5px;
}
</style>
