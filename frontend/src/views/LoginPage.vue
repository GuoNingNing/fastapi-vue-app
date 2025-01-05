<template>
  <div class="login-page">
    <!-- 标题 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="goBack"
    />

    <!-- 登录表单 -->
    <div class="form-container">
      <!-- 用户名输入框 -->
      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
        left-icon="user-o"
        clearable
      />
      <!-- 密码输入框 -->
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        left-icon="lock"
        clearable
      />
      <!-- 登录按钮 -->
      <van-button
        type="primary"
        block
        round
        class="login-button"
        @click="login"
      >
        登录
      </van-button>

      <!-- 辅助链接 -->
      <div class="link-container">
        <span @click="register">注册账号</span>
        <span @click="forgotPassword">忘记密码？</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { post } from '@/http.ts';

const router = useRouter();
const username = ref('');
const password = ref('');

// 返回上一页
const goBack = () => {
  router.back();
};

// 登录事件
const login = () => {
  if (!username.value || !password.value) {
    return alert('请输入用户名和密码');
  }
  console.log('用户名:', username.value);
  console.log('密码:', password.value);
  // 在这里处理实际的登录逻辑，例如调用接口
  post('/auth/token', {
    username: username.value,
    password: password.value
  }).then(response => {
    localStorage.setItem('access_token', response.access_token);
    console.log('登录成功: response.access_token', response);
    console.log('登录成功:', localStorage.getItem('access_token'));

  }).catch(error => {
    console.error('登录失败:', error);
  });
  router.push('/'); // 登录成功后跳转首页
};

// 注册事件
const register = () => {
  console.log('跳转到注册页面');
  router.push('/register'); // 跳转到注册页面
};

// 忘记密码事件
const forgotPassword = () => {
  console.log('跳转到忘记密码页面');
  router.push('/forgot-password'); // 跳转到忘记密码页面
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.form-container {
  margin: 20px;
}

.login-button {
  margin-top: 20px;
}

.link-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: #1989fa;
  font-size: 14px;
  cursor: pointer;
}
</style>
