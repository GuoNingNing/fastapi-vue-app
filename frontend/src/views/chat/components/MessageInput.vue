<template>
  <van-field
    v-model="text"
    rows="1"
    autosize
    label="输入"
    right-icon="arrow-up"
    @click-right-icon="send"
    @keypress.enter="send"
    class="message-input"
  />
</template>

<script setup>
import { ref, watch } from 'vue';

// 定义事件触发，向父组件传递发送消息
// const emit = defineEmits < { event: 'send', message: string } > ('');
const emit = defineEmits(['send']);
const text = ref('');

const send = () => {
  if (!text.value.trim()) return;
  emit('send', text.value);
  text.value = '';
};
</script>

<style scoped>
.message-input {
  padding: 10px;
  background-color: #fff;
}
</style>
