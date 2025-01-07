<template>
  <div class="message-input-wrapper">
    <van-field
      v-model="text"
      type="textarea"
      rows="1"
      autosize
      @keydown.enter.prevent="handleEnter"
      class="message-input"
      placeholder="请输入"
    >
      <template #button>
        <van-button :loading="loading" :disabled="loading" :onclick="send" size="small" type="primary">发送</van-button>
      </template>
    </van-field>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['send'])
const text = ref('')
defineProps({
  loading: Boolean
})

const handleEnter = () => {

}

const send = () => {
  if (!text.value.trim()) return
  emit('send', text.value)
  text.value = ''
}
</script>

<style scoped>
.message-input-wrapper {
  display: flex;
  background-color: #F7F7F7;
  padding: 12px;
}

.message-input {
  padding: 10px;
  background-color: #EDEDED;
}

.van-icon {
  font-size: 24px;
  color: #007bff;
}

</style>
