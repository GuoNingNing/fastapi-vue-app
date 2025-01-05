<template>
  <div class="chat-input">
    <div style="width: 80%;">
      <el-input
        type="textarea"
        :rows="3"
        v-model="inputText"
        @keydown="handleKeydown"
        placeholder="Type a message..."
        :disabled="loading"
      ></el-input>
    </div>
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

const handleKeydown = async (event) => {
  // 检查是否按下了 Enter 键
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      // 如果 Shift 键也按下，允许换行
      return;
    } else {
      // 如果只按下 Enter，调用发送消息的方法
      event.preventDefault(); // 阻止默认换行行为
      handleSend();
    }
  }
}

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
