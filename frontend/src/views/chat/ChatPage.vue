<template>
  <div class="chat-page">
    <van-nav-bar title="ChatGpt" left-arrow @click-left="showDrawer = true">
      <template #left>
        <van-icon name="more-o" size="24" />
      </template>
    </van-nav-bar>
    <!-- 聊天区域 -->
    <div class="chat-content" ref="chatContent" v-scroll>
      <ChatBubble v-for="(msg, index) in message" :key="index" :message="msg" />
    </div>
    <!-- 底部输入框和工具栏 -->
    <MessageInput :loading="loading" @send="sendMessage" />
    <!-- 使用封装的 SideMenu 组件 -->
    <SideMenu v-model:show="showDrawer">
      <template #header>
        <van-row style="line-height: 50px">
          <van-col span="20">
            <van-search placeholder="搜索" />
          </van-col>
          <van-col span="4">
            <van-icon size="24" @click="chatStore.newSession();showDrawer = false" name="chat-o" />
          </van-col>
        </van-row>
      </template>
      <template #default>
        <van-cell-group title="聊天" inset border>
          <van-cell
            v-for="c in chats"
            :title="c?.title"
            :key="c?.session_id"
            center
            clickable
            border
            @click="chatStore.checkSession(c.session_id)"
          >
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-icon name="delete" class="delete-icon" @click="chatStore.delSession(c.session_id)" />
            </template>

          </van-cell>
        </van-cell-group>
      </template>
      <template #footer>footer</template>
    </SideMenu>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useChatStore } from './chatStore'
import ChatBubble from './components/ChatBubble.vue'
import MessageInput from './components/MessageInput.vue'
import SideMenu from '@/views/chat/components/SideMenu.vue'
import { list_session } from '@/views/chat/api.ts'
import type { Chat } from '@/views/chat/chatTypes.ts'

const loading = ref(false)
const showDrawer = ref(false)
const chatStore = useChatStore()
const chatContent = ref(null)

const message = computed(() => chatStore.message)

const sendMessage = async (text: string) => {
  loading.value = true
  await chatStore.sendMessage(text)
  loading.value = false
}

const chats = computed(() => chatStore.chats)

onMounted(() => {
  list_session((data) => {
    chatStore.init(data)
  })
})
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ededed;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 5px;
}
</style>
