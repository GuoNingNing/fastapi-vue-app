<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="loadData"
    >
      <van-cell
        v-for="(item, index) in messages"
        :key="index"
        :title="`Event ${index + 1}`"
        :label="item"
      />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { client, ItemsService, UsersService } from '@/client'

const baseUrl = import.meta.env.VITE_APP_BASE_URL

client.setConfig({
  baseURL: baseUrl,  // 设置你的 API 基础 URL
  timeout: 100000,  // 设置请求超时时间
  // set default headers for requests
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
})
client.instance.interceptors.request.use()

// 存储消息
const messages = ref([])
const loading = ref(false)
const finished = ref(false)

// 通过 Axios 获取事件流
const loadData = async () => {
  if (loading.value) return

  loading.value = true

  ItemsService.getItems().then((r) => {
    console.log('------------------------')
    console.log(r.data)
    // messages.value = r.data;
  })
}
onMounted(()=>{
  UsersService.me().then((r) => {
    console.log('-----------me-------------')
    console.log(r.data)
  })
})
</script>
