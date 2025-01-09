<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">

import { client } from '@/client'

export default {
  name: 'App'
}

const baseUrl = import.meta.env.VITE_APP_BASE_URL

client.setConfig({
  baseURL: baseUrl,  // 设置你的 API 基础 URL
  timeout: 100000,  // 设置请求超时时间
  // set default headers for requests
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
})

</script>
