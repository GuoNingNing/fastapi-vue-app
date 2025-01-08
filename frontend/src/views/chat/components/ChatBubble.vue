<template>
  <div :class="['chat-bubble', role]">
    <div class="message">
      <MarkdownRander id="md_0" :content="message.content" />
    </div>
    <span class="timestamp">{{ timestamp }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownRander from '@/components/MarkdownRander.vue'

// 确保传递正确的 prop 名称
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})

const role = computed(() => (props.message.role === 'user' ? 'user' : 'gpt'))
const timestamp = computed(() =>
  props.message.timestamp ? props.message.timestamp : '胡编乱造中...',
)
</script>

<style scoped>
.chat-bubble {
  max-width: 100%;
  margin: 10px 5px;
  padding: 5px;
  border-radius: 5px;
}

.timestamp {
  font-size: 70%;
  color: #4c4c4c;
}

.user {
  max-width: 70%;
  background-color: #07c160;
  margin-left: auto;
  text-align: right;
}

.gpt {
  background-color: #ffffff;
}
</style>
