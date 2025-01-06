import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { Message } from './chatTypes.ts';
import { stream } from '@/http';

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
    loading: false
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
      this.messages.push({ ...message, timestamp: Date.now() });
    },
    async fetchGPTReply(userInput: string) {
      this.loading = true;
      const replay = reactive({
        role: 'gpt',
        content: '',
        timestamp: 0
      });
      this.messages.push(replay);
      await stream('/gpt/ask', (data) => {
          replay.content += data;
          console.log(replay.content);
        },
        'POST',
        { content: userInput, stream: true }
      );
      replay.timestamp = Date.now();
      this.loading = false;
      this.saveMessages();
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
