import { defineStore } from 'pinia'
import type { Message } from './chatTypes.ts'
import { get, stream } from '@/http.ts'
import { reactive } from 'vue'
import { showToast } from 'vant'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[]
  }),
  actions: {
    // 初始化时自动加载聊天记录
    async loadMessages() {
      const savedMessages = localStorage.getItem('messages')
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages)
      }
    },
    async sendMessage(text: string) {
      await this.addMessage({ role: 'user', content: text })
      const replay = reactive({
        role: 'gpt',
        content: '',
        timestamp: 0
      })
      await this.addMessage(replay)

      await stream('POST', '/gpt/ask', (data) => {
          replay.content += data
        },
        { content: text, stream: true }
      ).finally(() => {
        replay.timestamp = Date.now()
        this.saveMessages()
      })
      return replay
    },
    async addMessage(message: Message) {
      this.messages.push(message)
    },
    async clearMessages() {
      localStorage.removeItem('messages')
      this.messages = []
      showToast('已清除');
      get('/gpt/clean').then(() => {
        console.log('Clear messages...')
      })
    },
    saveMessages() {
      localStorage.setItem('messages', JSON.stringify(this.messages))
    }
  }
})
