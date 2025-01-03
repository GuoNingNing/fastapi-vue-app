<template>
  <main>
    <div class="about">
      <MarkdownRander id="aaa" :content="userInfo"></MarkdownRander>
    </div>
  </main>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {get} from '@/http'; // 导入你封装的 http 请求函数
import MarkdownRander from "@/components/MarkdownRander.vue";

// 使用 ref 创建响应式的 fetchData
const userInfo = ref<string>(``);

// 获取用户数据的异步函数
const fetchUserData = async () => {
  get<object>('/users/me').then(user => {
    userInfo.value += `

\`\`\`json
${JSON.stringify(user, null, 2)}
\`\`\`
    `;

    console.log(userInfo.value)
  }).catch(err => {
    console.error('Error fetching user data:', err);
  })

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
