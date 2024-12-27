<template>
  <div class="layout-wrapper">
<!--    <header class="header">-->
<!--      <AppLogo />-->
<!--      <AppHeader />-->
<!--    </header>-->
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
import AppLogo from "@/components/AppLogo.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import AppFooter from "@/components/AppFooter.vue";
import MainContent from "@/components/MainContent.vue";

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
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Main 部分 */
.main-container {
  display: flex;
  flex: 1;
  background-color: #f0f2f5;
}

/* Footer 样式 */
.footer {
  padding: 15px;
  background-color: #ffffff;
  text-align: center;
  border-top: 1px solid #eaeaea;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}
</style>
