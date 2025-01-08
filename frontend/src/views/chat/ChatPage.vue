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
      <template #header>
        <van-row style="line-height: 50px;">
          <van-col span="18">
            <van-search placeholder="搜索" />
          </van-col>
          <van-col span="3">
            <van-icon @click="chatStore.clearMessages()" name="delete-o" />
          </van-col>
          <van-col span="3">
            <van-icon @click="chatStore.newSession()" name="chat-o" />
          </van-col>
        </van-row>
      </template>
      <template #default>
        <van-cell-group title="聊天" inset border>
          <van-cell center clickable border @click="chatStore.clearMessages()" title="aaa" />
          <van-cell center clickable border @click="chatStore.clearMessages()" title="bbb" />
        </van-cell-group>
      </template>
      <template #footer>
        footer
      </template>
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
