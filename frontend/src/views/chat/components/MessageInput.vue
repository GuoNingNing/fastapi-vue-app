<template>
  <van-field
    v-model="text"
    type="textarea"
    rows="3"
    autosize
    right-icon="arrow-up"
    @click-right-icon="send"
    @keypress.enter="send"
    class="message-input"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['send'])
const text = ref('')

const send = () => {
  if (!text.value.trim()) return
  emit('send', text.value)
  text.value = ''
}
</script>

<style scoped>
.message-input {
  padding: 10px;
  background-color: #f9f9f9; /* 修改为浅灰色背景，提升视觉对比 */
  border-radius: 8px; /* 给输入框增加圆角 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* 为输入框增加轻微阴影，提升视觉效果 */
}
</style>
