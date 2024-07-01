import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from './layouts/Mainlayout.vue';
import HomePage from './pages/HomePage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
