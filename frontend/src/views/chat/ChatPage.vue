<template>
  <div class="chat-page">
    <van-nav-bar title="ChatGpt" left-arrow @click-left="showDrawer = true">
      <template #left>
        <van-icon name="more-o" size="24" />
      </template>
    </van-nav-bar>
    <!-- 聊天区域 -->
    <div class="chat-content" v-scroll>
      <ChatBubble v-for="(m, i) in messages" :key="i" :message="m" />
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
            :class="session_id === s.session_id ? 'active' : ''"
          >
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-icon name="delete" class="delete-icon" @click="delSession(s.session_id)" />
            </template>
          </van-cell>
        </van-cell-group>
      </template>
      <template #footer>footer</template>
    </SideMenu>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import ChatBubble from './components/ChatBubble.vue'
import MessageInput from './components/MessageInput.vue'
import SideMenu from '@/views/chat/components/SideMenu.vue'
import { del_session, get_session, list_session, new_session } from '@/views/chat/api.ts'
import type { Chat, Message } from '@/views/chat/chatTypes.ts'
import { stream } from '@/http.ts'

const loading = ref(false)
const showDrawer = ref(false)

const session_id = ref('')
const sessions = ref<Chat[]>([])
const messages = ref<Message[]>([])

const sendMessage = async (text: string) => {
  messages.value.push({ role: 'user', content: text, timestamp: new Date(Date.now()).toLocaleString() })

  const replay = reactive({
    role: 'gpt',
    content: '',
    timestamp: '',
  })

  messages.value.push(replay)

  stream(
    'POST',
    '/chats/ask',
    { session_id: session_id.value, content: text, stream: true },
    (data: string) => {
      replay.content += data
    },
  ).finally(() => {
    replay.timestamp = new Date(Date.now()).toLocaleString()
    localStorage.setItem(session_id.value, JSON.stringify(messages.value))
  })
}

const checkSession = async (sid: string) => {
  localStorage.setItem('session_id', sid)
  session_id.value = sid
  get_session(sid, (c: Chat) => {
    messages.value = JSON.parse(c?.message || '[]')
  })
}

const newSession = async () => {
  new_session((chat) => {
    session_id.value = chat.session_id
    sessions.value.unshift(chat)
    checkSession(chat.session_id)
  })
}

const delSession = async (sid: string) => {
  del_session(sid, () => {
    const indexToDelete = sessions.value.findIndex((s) => s.session_id === sid)
    // 检查索引是否有效
    if (indexToDelete !== -1) {
      // 使用 splice 方法删除该元素
      sessions.value.splice(indexToDelete, 1)
    }

    session_id.value = sessions.value[0].session_id
    checkSession(session_id.value)
  })
}

onMounted(() => {
  list_session((chats) => {
    sessions.value = chats

    session_id.value = localStorage.getItem('session_id') || chats[0].session_id

    checkSession(session_id.value)
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

.active {
  background-color: #07C160;
}
</style>
