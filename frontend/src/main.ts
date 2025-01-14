import 'vant/lib/index.css'
import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vant from 'vant'
import Notify from 'vant'
import App from './App.vue'
import router from './router'

import vScroll from './utils/v-scroll.ts'
import { client } from '@/client'


const baseUrl = import.meta.env.VITE_APP_BASE_URL

client.setConfig({
  baseURL: baseUrl,  // 设置你的 API 基础 URL
  timeout: 100000,  // 设置请求超时时间
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
})


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vant)
app.use(Notify)

// 注册指令
app.directive('scroll', vScroll)

app.mount('#app')

