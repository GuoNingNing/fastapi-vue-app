<template>
  <el-container class="layout-container-demo" style="height: 100vh;">
    <el-aside width="200px;" style="height: 100vh; background-color: #FFFFFF">
      <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <message/>
              </el-icon>
              搞个玩意
            </template>
            <el-menu-item-group>
              <template #title>GPT</template>
              <el-menu-item v-for="item in menuItems" :key="item.name">
                <router-link :to="item.path">{{ item.name }}</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting/>
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Message, Setting} from '@element-plus/icons-vue'

const menuItems = [
  {name: "首页", path: "/home"},
  {name: "关于", path: "/about"},
  {name: "登录", path: "/login"},
  // 你可以根据需要动态生成更多菜单项
]
</script>

<style scoped>
.layout-container-demo {
  background-color: #f9f9f9;
}
.layout-container-demo .el-header {
  position: relative;

  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
