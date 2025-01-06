import { createRouter, createWebHistory } from 'vue-router';
import About from '@/views/AboutView.vue';
import Chat from '@/views/chat/ChatPage.vue';
import Login from '@/views/LoginPage.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomePage.vue') },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: { requiresAuth: true }
    },
    {
      path: '/chat/settings',
      name: 'Settings',
      component: () => import('@/views/chat/SettingsPage.vue'),
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

function isLoggedIn() {
  return !!localStorage.getItem('access_token');
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
