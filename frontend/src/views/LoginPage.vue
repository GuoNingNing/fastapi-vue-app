<template>
  <van-nav-bar
    title="登录"
    left-arrow
    @click-left="goBack"
  />
  <div class="login-page">
    <!-- 登录表单 -->
    <div class="form-container">
      <!-- 用户名输入框 -->
      <van-field
        v-model="username"
        label="用户名"
        label-width="60px"
        placeholder="请输入用户名"
        left-icon="user-o"
        clearable
      />
      <!-- 密码输入框 -->
      <van-field
        v-model="password"
        type="password"
        label="密码"
        label-width="60px"
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
        <!--        <span @click="register">注册账号</span>-->
        <!--        <span @click="forgotPassword">忘记密码？</span>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import { isLogin } from '@/utils/user'
import { AuthService } from '@/client'

const router = useRouter()
const username = ref('')
const password = ref('')

// 返回上一页
const goBack = () => {
  router.back()
}

// 登录事件
const login = async () => {
  if (!username.value || !password.value) {
    return showToast('请输入用户名和密码')
  }
  showToast('登录中...')
  const response = await AuthService.token({
    body: {
      username: username.value,
      password: password.value
    }
  })

  localStorage.setItem('access_token', response.data?.access_token || '')
  await router.push('/')
}

// 注册事件
const register = () => {
  console.log('跳转到注册页面')
  router.push('/register') // 跳转到注册页面
}

// 忘记密码事件
const forgotPassword = () => {
  console.log('跳转到忘记密码页面')
  router.push('/forgot-password') // 跳转到忘记密码页面
}

onMounted(async () => {
  if (isLogin()) {
    await router.push('/')
  }
})

</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
}


.form-container {
  padding-top: 100px;
  width: 300px;
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
