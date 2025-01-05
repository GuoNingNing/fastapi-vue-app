import { createRouter, createWebHistory } from 'vue-router';
import About from '@/views/AboutView.vue';
import GPT from '@/views/chat/ChatPage.vue';
import Login from '@/views/LoginPage.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomePage.vue') },
    {
      path: '/gpt',
      name: 'GPT',
      component: GPT,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    // 你可以根据需要继续添加其他路由
  ]
});

// 假设你有一个方法来检查用户是否登录
function isLoggedIn() {
  // 这里可以根据你的具体实现来检查登录状态
  return !!localStorage.getItem('access_token'); // 示例：查看 localStorage 中是否有用户信息
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
