<template>
  <div class="sidebar">
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppSidebar",
  data() {
    return {
      menuItems: [
        {name: "首页", path: "/home"},
        {name: "关于", path: "/about"},
        // 你可以根据需要动态生成更多菜单项
      ],
    };
  },
};
</script>

<style scoped>
/* Sidebar 样式 */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: #fff;
  padding: 20px 15px;
  height: 100%;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
}

/* Sidebar item 样式 */
.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 15px 0;
}

.sidebar a {
  display: block;
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.sidebar a:hover {
  background-color: #34495e;
}

</style>
