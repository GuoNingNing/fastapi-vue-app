import { createRouter, createWebHistory } from 'vue-router'
import About from "@/views/AboutView.vue";
import Home from "@/views/HomeView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  // 你可以根据需要继续添加其他路由
  ],
})

export default router;
