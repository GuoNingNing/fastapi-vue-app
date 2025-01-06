import { defineStore } from 'pinia'
import { fetchGPTResponse } from './api'
import type { Message } from '@/types/chat.ts'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
    loading: false
  }),
  actions: {
    // 初始化时自动加载聊天记录
    async loadMessages() {
      const savedMessages = localStorage.getItem('messages')
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages)
      }
    },
    async addMessage(message: Message) {
      this.messages.push({ ...message, timestamp: Date.now() })
    },
    async fetchGPTReply(userInput: string) {
      this.loading = true
      try {
        const reply = await fetchGPTResponse(userInput)
        this.messages.push({
          role: 'gpt',
          content: reply,
          timestamp: Date.now()
        })
        this.saveMessages()
      } catch (error) {
        console.error('GPT回复失败', error)
      } finally {
        this.loading = false
      }
    },
    saveMessages() {
      localStorage.setItem('messages', JSON.stringify(this.messages)) // 保存聊天记录到 localStorage
    },
    clearMessages() {
      this.messages = []
      localStorage.removeItem('messages') // 清空聊天记录并从 localStorage 移除
    }
  }
})
