<template>
  <van-field
    v-model="text"
    type="textarea"
    rows="1"
    autosize
    @keydown.enter.prevent="handerEnter"
    class="message-input"
    placeholder="请输入"
  >
    <template #button>
      <van-button :loading="loading" :disabled="loading" :onclick="send" size="small" type="primary">发送</van-button>
    </template>
  </van-field>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['send']);
const text = ref('');
const loading = ref(false);

const handerEnter = () => {

};

const send = () => {
  if (!text.value.trim()) return;
  loading.value = true;  // 设置按钮为loading状态，禁用按钮
  emit('send', text.value, () => {  // 向父组件传递发送完成后的回调
    loading.value = false;  // 请求完成后恢复按钮状态
  });
  text.value = '';
};
</script>

<style scoped>
.message-input {
  padding: 10px;
  background-color: #F7F7F7;
  input {
    background-color: #EDEDED;
    padding: 10px;
  }
}

.van-icon {
  font-size: 24px;
  color: #007bff;
}

</style>
