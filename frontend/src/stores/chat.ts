import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
  const messages = ref<{ id: number; text: string; sender: string }[]>([]);

  // 发送消息
  const sendMessage = (message: string) => {
    messages.value.push({ id: Date.now(), text: message, sender: 'user' });
    // 模拟后台消息
    setTimeout(() => {
      messages.value.push({ id: Date.now(), text: `你说了：${message}`, sender: 'bot' });
    }, 1000);
  };

  return { messages, sendMessage };
});
