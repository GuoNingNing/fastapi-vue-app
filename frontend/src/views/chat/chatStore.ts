import { defineStore } from 'pinia'
import type { Chat, Message } from './chatTypes.ts'
import { stream } from '@/http.ts'
import { reactive } from 'vue'
import { showToast } from 'vant'
import { del_session, new_session } from '@/views/chat/api.ts'

export const useChatStore = defineStore('chats', {
  state: () => ({
    title: '',
    session_id: '',
    sessions: [],
    message: [] as Message[],
    chats: [] as Chat[]
  }),
  actions: {
    async init(chats: Chat[]) {
      this.chats = chats || []
      this.session_id = localStorage.getItem('session_id') || chats[0].session_id
      const chat = chats.find(c => c.session_id == this.session_id)
      this.message = JSON.parse(chat?.message || '[]')

      this.updateStore()
    },
    async newSession() {
      console.log('Click newSession')
      new_session((chat) => {
        this.session_id = chat.session_id
        this.message = []
        this.chats.push(chat)
        this.updateStore()
        showToast('开始新会话')
      })
    },
    delSession(session_id: string) {
      del_session(session_id)
      this.chats = [...this.chats.filter(c => c.session_id == session_id)]
      this.updateStore()
      showToast('删除成功')
    },
    checkSession(session_id: string) {
      console.log('checkSession', session_id)
      const chat = this.chats.find(c => c.session_id == session_id)
      this.session_id = session_id
      this.message = JSON.parse(chat?.message || '[]')

      this.updateStore()
    },
    async sendMessage(text: string) {
      console.log('sendMessage session_id', this.session_id, text)
      this.message.push({ role: 'user', content: text, timestamp: Date.now() })

      const replay = reactive({
        role: 'gpt',
        content: '',
        timestamp: 0
      })

      this.message.push(replay)

      stream(
        'POST',
        '/chats/ask',
        { session_id: this.session_id, content: text, stream: true },
        (data: string) => {
          replay.content += data
        }
      ).finally(() => {
        this.updateStore()
      })
    },
    updateStore() {
      console.log(this.chats)
      localStorage.setItem('session_id', this.session_id)
      localStorage.setItem('chats', JSON.stringify(this.chats))
      localStorage.setItem(this.session_id, JSON.stringify(this.message))
    }
  }
})
