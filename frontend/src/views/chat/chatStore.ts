import { defineStore } from 'pinia'
import type { Message } from './chatTypes.ts'
import { get, stream } from '@/http.ts'
import { reactive } from 'vue'
import { showToast } from 'vant'

export const useChatStore = defineStore('chats', {
  state: () => ({
    messages: [] as Message[]
  }),
  actions: {
    // 初始化时自动加载聊天记录
    async loadMessages(session_id: string) {
      const savedMessages = localStorage.getItem(session_id)
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages)
      }
    },
    async sendMessage(session_id: string, text: string) {
      this.messages.push({ role: 'user', content: text })
      const replay = reactive({
        role: 'gpt',
        content: '',
        timestamp: 0
      })

      this.messages.push(replay)

      stream(
        'POST',
        '/chats/ask',
        { session_id: session_id, content: text, stream: true },
        (data: string) => {
          replay.content += data
        }
      ).finally(() => {
        replay.timestamp = Date.now()
        this.saveMessages(session_id)
      })
    },
    async clearMessages(session_id: string) {
      localStorage.removeItem(session_id)
      this.messages = []
      showToast('已清除')
      get('/chats/clean').then(() => {
        console.log('Clear messages...')
      })
    },
    saveMessages(session_id: string) {
      localStorage.setItem(session_id, JSON.stringify(this.messages))
    },
    newSession() {
      get<{ title: string, session_id: string }>('/chats/new_sessions').then((r) => {
        localStorage.setItem('session_id', r.session_id)
      })
    }
  }
})
