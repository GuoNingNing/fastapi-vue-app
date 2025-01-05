<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import H5Layout from "@/layouts/H5Layout.vue";

export default {
  name: "App",
  components: {
    H5Layout,
    DefaultLayout,
  },
};
</script>
