<template>
  <div class="message-input-wrapper">
    <van-row>
      <van-field
        v-model="text"
        type="textarea"
        :rows="row"
        @keydown.enter.prevent="handleEnter"
        class="message-input"
        placeholder="请输入"
      >
      </van-field>
    </van-row>
    <van-row style="padding-top: 10px">
      <van-col span="23">
        <van-tag round :color="state? '#7232dd':'#646464'" :onclick="toggle">Youtube</van-tag>
      </van-col>
      <van-col span="1">
        <van-icon :loading="loading" :disabled="loading" :onclick="send" size="24px" name="upgrade" />
      </van-col>
    </van-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobile = () => {
  const i = /Mobi|Android/i.test(navigator.userAgent)
  console.log('isMobile: ', i)
  return i
}

const row = ref(isMobile() ? 1 : 3)


const emit = defineEmits(['send'])
const text = ref('')

const state = ref(false)

const toggle = () => {
  state.value = !state.value
}


defineProps({
  loading: Boolean
})

const handleEnter = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault() // 阻止默认的换行行为

    if (event.shiftKey || isMobile()) {
      text.value += '\n'
      const textArea = event.target as HTMLTextAreaElement
      textArea.selectionStart = text.value.length + 1
    } else {
      send() // 调用发送功能
    }
  }
}

const send = () => {
  row.value = isMobile() ? 1 : 3
  if (!text.value.trim()) return
  emit('send', text.value)
  text.value = ''
}
</script>

<style scoped>
.message-input-wrapper {
  background-color: #F7F7F7;
  padding: 12px;
}

.message-input {
  padding: 10px;
  background-color: #EDEDED;
  border-radius: 8px;
}

.van-icon {
  font-size: 24px;
  color: #007bff;
}

</style>
