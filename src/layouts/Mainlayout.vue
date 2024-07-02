<template>
  <div>
    <header>
      <!-- Your header content here -->
      <navbar />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <!-- Your footer content here -->
    </footer>

    <!-- Modals -->
    <signup-modal v-if="showSignupModal" @close="showSignupModal = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SignupModal from '../components/Signup/Signup.vue'
import Navbar from '../components/Navbar/Navbar.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    SignupModal,
    Navbar
  },
  setup() {
    const showSignupModal = ref(false)

    return {
      showSignupModal,
    }
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
