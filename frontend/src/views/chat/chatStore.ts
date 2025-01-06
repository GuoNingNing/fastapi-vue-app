import { defineStore } from 'pinia';
import type { Message } from './chatTypes.ts';

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[]
  }),
  actions: {
    // 初始化时自动加载聊天记录
    async loadMessages() {
      const savedMessages = localStorage.getItem('messages');
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages);
      }
    },
    async addMessage(message: Message) {
      this.messages.push(message);
    },
    saveMessages() {
      localStorage.setItem('messages', JSON.stringify(this.messages)); // 保存聊天记录到 localStorage
    },
    clearMessages() {
      this.messages = [];
      localStorage.removeItem('messages'); // 清空聊天记录并从 localStorage 移除
    }
  }
});
