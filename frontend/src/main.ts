import 'vant/lib/index.css'
import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vant, { showToast } from 'vant'
import Notify from 'vant'
import App from './App.vue'
import router from './router'

import vScroll from './utils/v-scroll.ts'
import { client } from '@/client'
import type { AxiosResponse } from 'axios'


const baseUrl = import.meta.env.VITE_APP_BASE_URL

client.setConfig({
  baseURL: baseUrl,  // 设置你的 API 基础 URL
  timeout: 100000,  // 设置请求超时时间
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
})

client.instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      // 如果返回的状态码是 200，直接返回数据部分
      return response
    } else {
      // 如果状态码不是 200，则抛出错误，方便后续处理
      return Promise.reject(new Error(JSON.stringify(response) || '请求失败'))
    }
  },
  (error) => {

    console.error(error)
    // 错误处理：比如服务器错误、超时等
    if (error.response) {
      const { code, message, error: errorMessage } = error.response.data
      switch (message) {
        case 'Token Expired':
          showToast('Token Expired: ' + message)
          localStorage.removeItem('access_token')
          break
        default:
          // alert('网络异常，请稍后重试: ' + (errorMessage || message))
      }
    } else if (error.request) {
      showToast('请求未收到响应')
    } else {
      showToast('请求配置错误')
    }
    return Promise.reject(error)
  }
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vant)
app.use(Notify)

// 注册指令
app.directive('scroll', vScroll)

app.mount('#app')

