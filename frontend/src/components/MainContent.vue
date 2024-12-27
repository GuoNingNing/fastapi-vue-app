<template>
  <div class="main-content">
    <slot/>
  </div>
</template>

<script lang="ts">
export default {
  name: "MainContent",
};
</script>

<style scoped>
/* Main Content 样式 */
.main-content {
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}
</style>
