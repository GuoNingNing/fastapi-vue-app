<template>
  <div class="layout-wrapper">
    <header class="header">
      <AppLogo />
      <AppHeader />
    </header>
    <div class="main-container">
      <AppSidebar />
      <MainContent>
        <router-view />
      </MainContent>
    </div>
    <footer class="footer">
      <AppFooter />
    </footer>
  </div>
</template>

<script lang="ts">
import AppLogo from "@/layouts/AppLogo.vue";
import AppHeader from "@/layouts/AppHeader.vue";
import AppSidebar from "@/layouts/AppSidebar.vue";
import AppFooter from "@/layouts/AppFooter.vue";
import MainContent from "@/layouts/MainContent.vue";

export default {
  components: {
    AppLogo,
    AppHeader,
    AppSidebar,
    AppFooter,
    MainContent,
  },
};
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Roboto", sans-serif;
  background-color: #f0f2f5;
}

/* Header 样式 */
.header {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
}

/* Main 部分 */
.main-container {
  display: flex;
  height: calc(100vh - 120px);
  flex: 1;
  background-color: #f0f2f5;
}

/* Footer 样式 */
.footer {
  height: 60px;
  text-align: center;
}
</style>
