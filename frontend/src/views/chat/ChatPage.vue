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
            v-for="c in chats"
            :title="c?.title"
            :key="c?.session_id"
            center
            border
            @click="checkSession(c.session_id)"
            :class="session_id === c.session_id ? 'active' : ''"
          >
            <template #right-icon>
              <van-icon name="delete" class="delete-icon" @click="delSession(c.session_id)" />
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
import { stream } from '@/http.ts'
import { type ChatBase, ChatsService } from '@/client'
import type { Message } from '@/views/chat/chatTypes.ts'

const loading = ref(false)
const showDrawer = ref(false)

const session_id = ref('')
const chats = ref<ChatBase[]>([])
const messages = ref<Message[]>([])

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
    { session_id: session_id.value, content: text, stream: true },
    (data: string) => {
      replay.content += data
    }
  ).finally(() => {
    replay.timestamp = new Date(Date.now()).toLocaleString()
    localStorage.setItem(session_id.value, JSON.stringify(messages.value))
  })
}

const checkSession = async (sid: string) => {
  localStorage.setItem('session_id', sid)
  session_id.value = sid

  ChatsService.getSession({ query: { session_id: sid } }).then((r) => {
    messages.value = JSON.parse(r.data?.message || '[]')
  })
}


const newSession = async () => {
  ChatsService.newSession().then((res) => {
    console.log('newSession', res)
    if (res.data) {
      session_id.value = res.data?.session_id || ''
      chats.value.unshift(res.data)
      checkSession(session_id.value)
    }
  })
}

const delSession = async (sid: string) => {

  ChatsService.delSession({ query: { session_id: sid } }).then((res) => {
    const indexToDelete = chats.value.findIndex((s) => s.session_id === sid)
    // 检查索引是否有效
    if (indexToDelete !== -1) {
      // 使用 splice 方法删除该元素
      chats.value.splice(indexToDelete, 1)
    }

    session_id.value = chats.value[0].session_id
    checkSession(session_id.value)
  })

}

const listSession = async () => {
  ChatsService.listSession().then((r) => {

    if (r.data && r.data.length > 0) {
      chats.value = r.data

      if (localStorage.getItem('session_id') === 'undefined') {
        localStorage.removeItem('session_id')
      }
      session_id.value = localStorage.getItem('session_id') || r.data[0].session_id
      checkSession(session_id.value)
    }
  })
}

onMounted(() => {
  listSession()
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
  background-color: #07c160;
}
</style>
