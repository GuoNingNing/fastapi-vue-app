<template>
  <el-container style="height: 100vh;">
    <!-- 左侧菜单 -->
    <el-aside width="200px" style="background-color: #f4f4f4; border-right: 1px solid #ddd;">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        active-text-color="#20a0ff"
      >
        <el-menu-item index="1">菜单项 1</el-menu-item>
        <el-menu-item index="2">菜单项 2</el-menu-item>
        <el-menu-item index="3">菜单项 3</el-menu-item>
        <el-menu-item index="4">菜单项 4</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容区 -->
    <el-main style="padding: 20px;">
      <div>
        <h2>欢迎来到我的页面</h2>
        <p>这是右侧的内容区域。</p>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'AppLayout',  // 组件名为多单词
});
</script>

<style scoped>
/* 确保容器和元素填充满页面 */
.el-container {
  display: flex;
  flex-direction: row; /* 水平排列 */
}

.el-aside {
  background-color: #f4f4f4;
}

.el-main {
  background-color: #fff;
  padding: 20px; /* 主区域内部留出一些空间 */
  overflow-y: auto; /* 确保内容区域超出时能够滚动 */
}

/* 可选：调整菜单的边框和颜色 */
.el-menu-vertical-demo {
  border-right: 1px solid #ddd;
}
</style>
