<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="loadData"
    >
      <van-cell
        v-for="(item, index) in messages"
        :key="index"
        :title="`Event ${index + 1}`"
        :label="item"
      />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { List, Cell } from 'vant';
import { stream } from '@/http';

// 存储消息
const messages = ref([]);
const loading = ref(false);
const finished = ref(false);

// 通过 Axios 获取事件流
const loadData = async () => {
  if (loading.value) return;

  loading.value = true;

  stream('/gpt/events', (data) => {
    messages.value.push(data);
  });

};
</script>
