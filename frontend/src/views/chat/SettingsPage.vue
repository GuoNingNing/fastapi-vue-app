<template>
  <div class="settings-page">
    <van-nav-bar title="设置 GPT System Prompt" left-text="返回" @click-left="goBack" />
    <div class="settings-content">
      <van-field
        v-model="name"
        label="Prompt 名称"
        placeholder="请输入名称"
        required
      />
      <van-field
        v-model="prompt"
        label="System Prompt"
        placeholder="请输入系统提示"
        type="textarea"
        rows="5"
        required
      />
      <div class="submit-btn">
        <van-button type="primary" @click="submit" :loading="loading">保存设置</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'vant';  // 导入 Notify 组件
import {post} from '@/http';

// 定义组件内部的响应式数据
const name = ref('');
const prompt = ref('');
const loading = ref(false);

// 使用 Vue Router 来实现返回功能
const router = useRouter();

// 后端接口请求函数
const submit = async () => {
  if (!name.value || !prompt.value) {
    Notify({ type: 'danger', message: '名称和提示内容不能为空' });
    return;
  }

  loading.value = true;

  try {
    const response = await post('/gpt/set_sys_prompt', {
      name: name.value,
      prompt: prompt.value,
    });

    if (response.status === 200) {
      Notify({ type: 'success', message: '设置成功' });
    } else {
      Notify({ type: 'danger', message: '设置失败，请重试' });
    }
  } catch (error) {
    console.error('设置失败', error);
    Notify({ type: 'danger', message: '请求失败，请稍后再试' });
  } finally {
    loading.value = false;
  }
};

// 返回上一步操作
const goBack = () => {
  router.go(-1); // 返回上一步
};
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
