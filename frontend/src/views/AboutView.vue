<template>
  <main>
    <div class="about">
      <MarkdownRander :content="markdownContent"></MarkdownRander>
    </div>
  </main>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {get} from '@/http'; // 导入你封装的 http 请求函数
import MarkdownRander from "@/components/MarkdownRander.vue";

// 定义 User 类型
interface User {
  user_id: number;
  username: string;
}
const markdownContent = `
# Hello World

> This is a paragraph with some **bold** text and [a link](https://example.com).


\`\`\`python
# 全局异常处理，统一错误响应格式
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "code": exc.status_code,
            "message": exc.detail,
            "data": None,
            "error": exc.detail
        }
    )

\`\`\`
`;
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
