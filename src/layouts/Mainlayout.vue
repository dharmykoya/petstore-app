<template>
  <div class="flex h-screen">
    <!-- Sidebar (only for authenticated admin users) -->
    <sidebar v-if="store.isAuth && store.isAdmin" class="relative z-10" />

    <!-- Main content area -->
    <div :class="mainContentClass">
      <header class="relative z-20">
        <!-- Navbar overlapping the sidebar -->
        <navbar />
      </header>
      <main class="flex-1 overflow-auto mt-16">
        <router-view />
      </main>
      <footer>
        <!-- Your footer content here -->
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from '../components/Navbar/Navbar.vue'
import Sidebar from '../components/Sidebar/Sidebar.vue'
import { useAuthStore } from '../store/auth'
import { computed } from 'vue'

const store = useAuthStore()

// Compute class for main content area based on authentication and admin status
const mainContentClass = computed(() => {
  return store.isAuth && store.isAdmin
    ? 'flex-1 flex flex-col pl-64'
    : 'flex-1 flex flex-col'
})
</script>

<style scoped>
/* Adjust padding for main content when sidebar is visible */
.pl-64 {
  padding-left: 16rem; /* 64 pixels (16 * 4px) */
}
</style>
