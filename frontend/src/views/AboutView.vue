<template>
  <main>
    <div class="about">
      <h1>This is an about page</h1>
      <!-- 使用响应式的数据 fetchData 显示用户信息 -->
      <b>{{ fetchData?.username }}</b>
    </div>
  </main>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {get} from '@/http'; // 导入你封装的 http 请求函数

// 定义 User 类型
interface User {
  user_id: number;
  username: string;
}

// 使用 ref 创建响应式的 fetchData
const fetchData = ref<User | null>(null);

// 获取用户数据的异步函数
const fetchUserData = async () => {
  try {
    // 获取用户数据，假设 `/user/1` 是有效的 API 路径
    const user = await get<User>('/user/1');
    fetchData.value = user;
  } catch (err) {
    console.error('Error fetching user data:', err);
  }
};

// 在组件加载时获取数据
onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
/* 可以根据需要添加样式 */
.about {
  padding: 20px;
}
</style>
