<template>
  <div class="message-input-wrapper">
    <van-row>
      <van-field
        v-model="text"
        type="textarea"
        :rows="row"
        autosize
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
import { computed, ref } from 'vue'
import { useToggle } from '@vant/use';

const row = computed(() => /Mobi|Android/i.test(navigator.userAgent) ? 1 : 3)


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
    if (event.shiftKey) {

      row.value += 1

      const textArea = event.target as HTMLTextAreaElement
      const start = textArea.selectionStart
      const end = textArea.selectionEnd

      // 在当前光标位置插入换行符
      textArea.value = textArea.value.substring(0, start) + '\n' + textArea.value.substring(end)

      // 更新光标位置到换行符后面
      textArea.selectionStart = textArea.selectionEnd = start + 1
    } else {
      send() // 调用发送功能
    }
  }
}

const send = () => {
  row.value = 3
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
