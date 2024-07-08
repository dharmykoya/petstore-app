import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/Mainlayout.vue'
import HomePage from './pages/HomePage.vue'
import OrderPage from './pages/OrderPage.vue'
import { useAuthStore } from './store/auth'

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
    meta: { requiresAuth: true },
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

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuth) {
    next({ name: 'Home',  })
  } else {
    next()
  }
})

export default router
