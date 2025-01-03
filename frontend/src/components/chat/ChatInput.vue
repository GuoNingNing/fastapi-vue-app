<template>
  <div class="chat-input">
    <!-- 输入框，绑定双向数据，按回车键触发发送事件 -->
    <el-input
      type="textarea"
      :rows="3"
      v-model="inputText"
      @keyup.enter="handleSend"
      placeholder="Type a message..."
      :disabled="loading"
    ></el-input>
    <div style="width: 10%;">
      <el-button type="info" :icon="Message" circle :disabled="loading" @click="handleSend"/>
      <el-button type="danger" :icon="Delete" @click="handleClean" circle/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import {ElMessageBox} from 'element-plus'
import {Delete, Message} from "@element-plus/icons-vue";

// 定义输入框的文本状态、按钮的禁用状态、loading 状态
const inputText = ref('');
const disabled = ref(true);  // 初始禁用
const loading = ref(false);  // 处理 loading 状态

// 定义事件触发，向父组件传递发送消息
const emit = defineEmits<{
  (event: 'ask', message: string): void;
  (event: 'clean'): void
}>();

// 监听输入框内容，动态更新禁用状态
watch(inputText, (newVal) => {
  disabled.value = newVal.trim() === '';  // 输入框为空时禁用按钮
});

// 发送消息的处理函数
const handleSend = async () => {
  if (inputText.value.trim()) {
    loading.value = true;  // 发送中，设置loading
    try {
      emit('ask', inputText.value.trim());
      inputText.value = '';  // 清空输入框
    } catch (error) {
      console.error('Message send failed:', error);
    } finally {
      loading.value = false;  // 发送完毕，恢复状态
    }
  }
};

const handleClean = () => {
  ElMessageBox.confirm('确认清除历史消息么？')
    .then(() => {
      emit('clean')
    })
    .catch(() => {
      // catch error
    })
}

</script>

<style scoped>
.chat-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-input input {
  width: 80%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.chat-input button {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.chat-input button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.chat-input button.disabled {
  background-color: #d6d6d6;
}

.chat-input button:not(:disabled):hover {
  background-color: #0056b3;
}
</style>
