<template>
  <div :class="['chat-bubble', role]">
    <div class="message">
      <MarkdownRander id="md_0" :content="message.content" />
    </div>
    <span class="timestamp">{{ timestamp }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownRander from '@/components/MarkdownRander.vue';

// 确保传递正确的 prop 名称
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const role = computed(() => (props.message.role === 'user' ? 'user' : 'gpt'));
const timestamp = computed(() =>
  new Date(props.message.timestamp || Date.now()).toLocaleTimeString()
);
</script>

<style scoped>
.chat-bubble {
  max-width: 70%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
}

.user {
  background-color: #e0f7fa;
  margin-left: auto;
}

.gpt {
  background-color: #f0f0f0;
  margin-right: auto;
}
</style>
