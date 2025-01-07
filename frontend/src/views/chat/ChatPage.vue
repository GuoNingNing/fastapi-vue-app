<template>
  <div class="chat-page">
    <van-nav-bar title="ChatGpt" left-arrow @click-left="showDrawer = true">
      <template #left>
        <van-icon name="more-o" size="18" />
      </template>
    </van-nav-bar>
    <!-- 聊天区域 -->
    <div class="chat-content" ref="chatContent" v-scroll>
      <ChatBubble v-for="(message, index) in messages" :key="index" :message="message" />
    </div>
    <!-- 底部输入框和工具栏 -->
    <MessageInput :loading="loading" @send="sendMessage" />
    <!-- 使用封装的 SideMenu 组件 -->
    <SideMenu v-model:show="showDrawer">
      <van-cell-group title="会话管理" inset border>
        <van-cell center clickable border @click="chatStore.clearMessages()" title="新建会话" />
        <van-cell center clickable border @click="chatStore.clearMessages()" title="清除历史" />
      </van-cell-group>
    </SideMenu>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useChatStore } from './chatStore'
import ChatBubble from './components/ChatBubble.vue'
import MessageInput from './components/MessageInput.vue'
import SideMenu from '@/views/chat/components/SideMenu.vue'

const loading = ref(false)
const showDrawer = ref(false)
const chatStore = useChatStore()
const chatContent = ref(null)

const messages = computed(() => chatStore.messages)

const sendMessage = async (text: string) => {
  loading.value = true
  await chatStore.sendMessage(text)
  loading.value = false
}
onMounted(() => {
  chatStore.loadMessages()
})
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
