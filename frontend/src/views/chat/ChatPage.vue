<template>
  <div class="chat-page">
    <van-nav-bar :title="active.title" left-arrow @click-left="showDrawer = true">
      <template #left>
        <van-icon name="more-o" size="24" />
      </template>
    </van-nav-bar>
    <!-- 聊天区域 -->
    <div class="chat-content" v-scroll>
      <template v-if="messages.length === 0">
        <p class="welcome-message">欢迎来到 ChatGpt！开始聊天吧。</p>
      </template>
      <ChatBubble v-for="(m, i) in messages" :key="i" :message="m" v-else />
    </div>
    <!-- 底部输入框和工具栏 -->
    <MessageInput :loading="loading" @send="sendMessage" />
    <!-- 使用封装的 SideMenu 组件 -->
    <SideMenu v-model:show="showDrawer">
      <template #header>
        <van-row style="line-height: 50px; align-items: center;">
          <van-col span="20">
            <van-search placeholder="搜索" />
          </van-col>
          <van-col span="4" style="display: flex; justify-content: center; align-items: center;">
            <van-icon size="24" @click="newSession" name="chat-o" />
          </van-col>
        </van-row>
      </template>
      <template #default>
        <van-cell-group title="聊天" inset border>
          <van-cell
            v-for="s in sessions"
            :title="s?.title"
            :key="s?.session_id"
            center
            border
            @click="checkSession(s.session_id)"
            :class="active.session_id === s.session_id ? 'active' : ''"
          >
            <template #right-icon>
              <van-icon name="delete" class="delete-icon" @click="delSession(s.session_id)" />
            </template>
          </van-cell>
        </van-cell-group>
      </template>
      <template #footer>
        <van-row>
          <van-col span="20" style="background-color: #07c160">
            {{ me.username }}
          </van-col>
          <van-col span="4">
            <van-icon name="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png" />
          </van-col>
        </van-row>
      </template>
    </SideMenu>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import ChatBubble from './components/ChatBubble.vue'
import MessageInput from './components/MessageInput.vue'
import SideMenu from '@/views/chat/components/SideMenu.vue'
import { type ChatSession, ChatsService, UsersService } from '@/client'
import type { Message } from '@/views/chat/chatTypes.ts'
import { stream } from '@/http.ts'
import { showToast } from 'vant'


const loading = ref(false)
const showDrawer = ref(false)

const active = reactive({
  title: 'New Chat',
  session_id: ''
})
const sessions = ref<ChatSession[]>([])
const messages = ref<Message[]>([])

const me = reactive({
  username: '',
  avatar: ''
})

// Stream
const sendMessage = async (text: string) => {
  messages.value.push({
    role: 'user',
    content: text,
    timestamp: new Date(Date.now()).toLocaleString()
  })

  const replay = reactive({
    role: 'gpt',
    content: '',
    timestamp: ''
  })

  messages.value.push(replay)

  stream(
    'POST',
    '/api/chats/ask',
    { session_id: active.session_id, content: text, stream: true },
    (data: string) => {
      replay.content += data
    }
  ).finally(() => {
    replay.timestamp = new Date(Date.now()).toLocaleString()
    if (active.title === 'New Chat') {
      ChatsService.title({ query: { session_id: active.session_id } }).then((res) => {
        active.title = res.data?.title || 'New Chat'
        active.session_id = res.data?.session_id || ''
      })
    }

    chatStore()
  })
}
const checkSession = async (sid: string) => {
  // 获取会话消息
  const response = await ChatsService.getSession({ query: { session_id: sid } })
  active.title = response.data?.title || 'New Chat'
  active.session_id = response.data?.session_id || ''
  messages.value = JSON.parse(response.data?.message || '[]')
  chatStore()
}


const newSession = async () => {
  const response = await ChatsService.newSession()
  active.title = response.data?.title || 'New Chat'
  active.session_id = response.data?.session_id || ''

  showToast(active.title)

  messages.value = []
  showDrawer.value = false
  chatStore()
}


const delSession = async (sid: string) => {
  await ChatsService.delSession({ query: { session_id: sid } })
  const indexToDelete = sessions.value.findIndex((s) => s.session_id === sid)
// 检查索引是否有效
  if (indexToDelete !== -1) {
    // 使用 splice 方法删除该元素
    sessions.value.splice(indexToDelete, 1)
  }

  active.session_id = sessions.value[0].session_id
  await checkSession(active.session_id)
}


function loadStore() {
  const activeStore = localStorage.getItem('active')
  if (activeStore) {
    const tmp = JSON.parse(activeStore)
    active.title = tmp.title
    active.session_id = tmp.session_id
  }

  const messagesStore = localStorage.getItem(active.session_id)
  if (messagesStore) {
    messages.value = JSON.parse(messagesStore)
  }
}


const initSessions = async () => {
  const response = await ChatsService.listSession()
  if (response.data && response.data.length > 0) {
    sessions.value = response.data

    if (active.session_id === '') {
      await checkSession(response.data[0].session_id)
    }
  }

  UsersService.me().then((r) => {
    me.username = r.data?.username || ''
    me.avatar = r.data?.avatar || ''
  })
}

const chatStore = () => {
  localStorage.setItem('active', JSON.stringify(active))
  localStorage.setItem(active.session_id, JSON.stringify(messages.value))
}

onMounted(() => {
  loadStore()
  initSessions()
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

.welcome-message {
  text-align: center;
  color: #888888;
  font-size: 16px;
  margin-top: 20px;
}

.active {
  background-color: #07c160;
}
</style>
