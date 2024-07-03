import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/Mainlayout.vue'
import HomePage from './pages/HomePage.vue'
import OrderPage from './pages/OrderPage.vue'

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
  {
    path: '/orders',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Order',
        component: OrderPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
