<template>
  <el-container class="weiruan" style="height: 100vh">
    <el-aside>
      <el-menu router :default-openeds="['1', '3']">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <message/>
            </el-icon>
            搞个玩意
          </template>
          <el-menu-item-group>
            <el-menu-item :index="item.path" v-for="item in menuItems" :key="item.name">
              {{ item.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container class="content">
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
  {name: "GPT", path: "/gpt"},
  {name: "关于", path: "/about"},
  {name: "登录", path: "/login"},
  // 你可以根据需要动态生成更多菜单项
]
</script>

<style scoped>
.el-aside {
  height: 100vh;
  width: 160px;
}

.el-menu {
  height: 100vh;
}

.content {
  padding: 0 10px;
  background-color: #0056b3;
  .el-main {
    background-color: #d1f0ff;
  }
}
</style>
