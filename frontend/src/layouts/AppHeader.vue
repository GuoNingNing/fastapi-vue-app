<template>
  <div class="header">
    <span class="title">后台管理系统</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.title {
  font-size: 18px;
}
</style>
