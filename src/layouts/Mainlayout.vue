<template>
  <div class="flex h-screen">
    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <header class="relative z-20">
        <!-- Navbar overlapping the sidebar -->
        <navbar />
      </header>
      <div class="flex relative h-full">
        <!-- Sidebar -->
        <sidebar />
        <main class="flex-1 overflow-auto mt-2 w-10/12 absolute main-layout">
          <router-view />
        </main>
      </div>
      <footer>
        <!-- Your footer content here -->
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from '../components/Navbar/Navbar.vue'
import Sidebar from '../components/Sidebar/Sidebar.vue'
</script>

<style scoped>
.main-layout {
  left: 16.67%;
}
</style>
