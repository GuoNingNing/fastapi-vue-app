<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-scrollbar>
          <ChatMessage :index="index" :key="index" v-for="(message, index) in messages" :message="message"/>
          <MarkdownRander id="md_0" :content="tmp_content"/>
        </el-scrollbar>
      </el-main>
      <el-footer>
        <ChatInput @ask="ask" @clean="clean"/>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from 'vue';
import ChatMessage from '@/components/chat/ChatMessage.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import {get} from '@/http.ts'
import type {Message} from '@/types/chat.ts'
import MarkdownRander from "@/components/MarkdownRander.vue";

const messages = ref<Message[]>([]);
const tmp_content = ref<string>('');

const access_token = localStorage.getItem('access_token')

async function clean() {
  await get<string>('/gpt/clean')
  messages.value = []
}

async function ask(content: string) {
  messages.value.push({content: content, role: 'user'});
  const url = `http://127.0.0.1:8000/api/gpt/ask?content=${encodeURIComponent(content)}`
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Accept': 'text/event-stream',  // 模拟事件流
    },
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let done, value;

  while (true) {
    ({done, value} = await reader.read());
    if (done) {
      messages.value.push({content: tmp_content.value, role: 'assistant'});
      tmp_content.value = ''
      break
    }
    const chunk = decoder.decode(value, {stream: true});
    tmp_content.value += chunk;
    // 确保滚动到最新消息
    scrollToBottom();
  }
}

const chatWindow = ref<HTMLElement | null>(null); // 用来引用 chat-window DOM 元素
// 在 messages 更新时滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (chatWindow.value) {
      chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
    }
  });
};
// 在组件加载时获取数据
onMounted(() => {

  get<Message[]>('/gpt/history').then((resp) => {
    console.log(resp);
    messages.value = resp;
  })

});

</script>

<style scoped>

</style>
