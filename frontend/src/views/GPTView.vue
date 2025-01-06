<template>
  <el-container class="main-container">
    <el-header>
      <div class="toolbar">
        <span>{{ user?.username }}</span>
        <el-dropdown>
          <el-icon style="margin-right: 8px; margin-top: 1px">
            <setting/>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="systemFormVisible = true">设置System</el-dropdown-item>
              <el-dropdown-item @click="cookiesFormVisible = true">设置Cookies</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-main ref="chatWindow">
      <el-scrollbar>
        <ChatMessage :index="index" v-for="(message, index) in messages" :key="index" :message="message"/>
        <MarkdownRander id="md_0" :content="tmp_content"/>
      </el-scrollbar>
    </el-main>
    <el-footer class="el-footer">
      <ChatInput @ask="ask" @clean="clean"/>
    </el-footer>
  </el-container>


  <el-dialog v-model="systemFormVisible" title="System prompt" width="500">
    <el-form :model="form">
      <el-form-item>
        <el-input type="textarea" :rows="10" v-model="form.prompt" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="systemFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="set_sys_prompt">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog v-model="cookiesFormVisible" title="设置 Cookies" width="500">
    <el-form :model="form">
      <el-form-item>
        <el-input type="textarea" :rows="10" v-model="cookies" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cookiesFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="set_cookies">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>
<script setup lang="ts">
import {nextTick, onMounted, reactive, ref} from 'vue';
import ChatMessage from '@/components/chat/ChatMessage.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import {get, post} from '@/http.ts';
import type {Message, User} from '@/types/chat.ts';
import MarkdownRander from "@/components/MarkdownRander.vue";
import {Setting} from "@element-plus/icons-vue";
import {ElMessage} from 'element-plus'

import {getUser} from "@/utils/user.ts";


const messages = ref<Message[]>([]);
const tmp_content = ref<string>('');
const access_token = localStorage.getItem('access_token');

const systemFormVisible = ref(false)
const cookiesFormVisible = ref(false)

const form = reactive({
  prompt: ''
})

const cookies = ref('')

const user = ref<User>()

async function clean() {
  await get<string>('/gpt/clean');
  messages.value = [];
}

async function ask(content: string) {
  messages.value.push({content, role: 'user'});
  const url = `http://127.0.0.1:8000/api/gpt/ask?content=${encodeURIComponent(content)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'text/event-stream',
      },
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const {done, value} = await reader?.read() || {};
      if (done) {
        messages.value.push({content: tmp_content.value, role: 'assistant'});
        tmp_content.value = '';
        break;
      }
      const chunk = decoder.decode(value, {stream: true});
      tmp_content.value += chunk;
      scrollToBottom();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function set_sys_prompt() {
  post('/gpt/set_sys_prompt', {prompt: form?.prompt}).then(res => {
    systemFormVisible.value = false;
    ElMessage({
      message: '设置成功！.',
      type: 'success',
    })
  })
}

async function set_cookies() {
  post('/gpt/set_cookies', {cookies: cookies.value}).then(res => {
    cookiesFormVisible.value = false;
    ElMessage({
      message: '设置成功！.',
      type: 'success',
    })
  })
}


const chatWindow = ref<HTMLElement | null>(null);
// 用于滚动到底部的函数
const scrollToBottom = () => {
  nextTick(() => {
    if (chatWindow.value) {
      chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
    }
  });
};
// 组件加载时获取数据
onMounted(async () => {
  try {
    const resp = await get<Message[]>('/gpt/history');
    console.log(resp);
    messages.value = resp;

    getUser().then(u => user.value = u);

  } catch (error) {
    console.error('Error fetching history:', error);
  }
});
</script>
<style scoped>
.main-container {
  display: flex;
  height: 100%;
  bottom: 10px;
  justify-content: center;

  .el-header {
    background-color: #eeeff7;
    padding: 0 10px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: right;

    .toolbar {
      text-align: right;
      font-size: 14px;
      line-height: 14px;
      background-color: #cccccc;

      span {
        padding: 0 10px;
      }
    }


  }

  .el-main {
    background-color: #ffffff;
  }

  .el-footer {
    position: sticky;
    height: 100px;
    bottom: 10px;
    right: 10px;
    color: white;
    padding: 10px;
  }
}


</style>
