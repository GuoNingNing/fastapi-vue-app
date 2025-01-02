<template>
  <div class="login-container">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">用户名:</label>
        <input type="text" v-model="username" required/>
      </div>
      <div>
        <label for="password">密码:</label>
        <input type="password" v-model="password" required/>
      </div>
      <button type="submit">登录</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {post} from '@/http.ts';

interface LoginResponse {
  token_type: string;                        // 用户的唯一 ID
  expires_in: number;                     // 过期时间
  access_token: string;                     // 登录 token

}

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  post<LoginResponse>('/auth/token', {
    username: username.value,
    password: password.value
  }).then(response => {
    localStorage.setItem('access_token', response.access_token);
    console.log('登录成功: response.access_token', response);
    console.log('登录成功:', localStorage.getItem('access_token'));

  }).catch(error => {
    console.error('登录失败:', error);
    errorMessage.value = '发生错误，请重试。';
  })
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: auto;
}

.error {
  color: red;
}
</style>
