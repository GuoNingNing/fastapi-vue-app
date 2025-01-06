<template>
  <div class="settings-page">
    <van-nav-bar title="设置" left-text="返回" @click-left="goBack" />
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit" @click="cleanHistory">
        清除历史数据
      </van-button>
    </div>
    <div class="settings-content">
      <van-field
        v-model="prompt.cookies"
        label="Cookies"
        placeholder="请输入Cookies"
        type="textarea"
        rows="5"
        required
      />
      <div style="margin: 16px" class="submit-btn">
        <van-button round block type="primary" native-type="submit" @click="submit" :loading="loading">保存设置</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showNotify, showToast } from 'vant'; // 导入 showNotify 组件
import { get, post } from '@/http';
import { useChatStore } from '@/views/chat/chatStore.ts';

// 定义组件内部的响应式数据
const prompt = reactive({
  name: '',
  cookies: ''
})
const loading = ref(false)

// 使用 Vue Router 来实现返回功能
const router = useRouter()

// 后端接口请求函数
const submit = async () => {
  if (!prompt.cookies) {
    showNotify({ type: 'danger', message: 'Cookies内容不能为空' })
    return
  }
  loading.value = true

  post('/gpt/set_cookies', prompt).then(() => {
    showNotify({ type: 'success', message: '设置成功' })
  }).catch(() => {
    showNotify({ type: 'danger', message: '请求失败，请稍后再试' })
  }).finally(() => {
    loading.value = false
  })
}

// 返回上一步操作
const goBack = () => {
  router.go(-1) // 返回上一步
}

const chatStore = useChatStore();

const cleanHistory = () => {
  get('/gpt/clean').finally(() => {
    chatStore.clearMessages();
    showToast('历史数据已清除');
  });
};

onMounted(async () => {

})

</script>

<style scoped>
.settings-page {
  padding: 10px;
}

.settings-content {
  margin-top: 20px;
}

.submit-btn {
  margin-top: 20px;
}
</style>
