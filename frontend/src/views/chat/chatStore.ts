import { defineStore } from 'pinia'
import type { Message } from './chatTypes.ts'
import { get, stream } from '@/http.ts'
import { reactive } from 'vue'
import { showToast } from 'vant'

export const useChatStore = defineStore('chats', {
  state: () => ({
    session_id: '',
    messages: [] as Message[],
  }),
  actions: {
    // 初始化时自动加载聊天记录
    loadMessages() {
      this.session_id = localStorage.getItem('session_id') || 'default'
      this.messages = JSON.parse(localStorage.getItem(this.session_id) || '[]')
    },
    async sendMessage(text: string) {
      console.log('sendMessage session_id', this.session_id, text)
      this.messages.push({ role: 'user', content: text })
      const replay = reactive({
        role: 'gpt',
        content: '',
        timestamp: 0,
      })

      this.messages.push(replay)

      stream(
        'POST',
        '/chats/ask',
        { session_id: this.session_id, content: text, stream: true },
        (data: string) => { replay.content += data },
      ).finally(() => {
        replay.timestamp = Date.now()
        this.saveMessages()
      })
    },
    async clearMessages() {
      this.messages = []
      localStorage.setItem(this.session_id, JSON.stringify(this.messages))
      showToast('已清除')
      // get('/chats/clean').then(() => {
      //   console.log('Clear messages...')
      // })
    },
    saveMessages() {
      localStorage.setItem(this.session_id, JSON.stringify(this.messages))
    },
    checkSession(session_id: string) {
      console.log('checkSession', session_id)
      localStorage.setItem('session_id', session_id)
      this.loadMessages()
    },
    newSession() {
      console.log('Click newSession')
      get<{ title: string; session_id: string }>('/chats/new_sessions').then((r) => {
        localStorage.setItem('session_id', r.session_id)
        this.loadMessages()
        showToast('开始新会话')
      })
    }
  },
})
