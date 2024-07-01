<template>
  <div>
    Welcome to Home Page
    <h1 className="text-3xl font-bold underline">Hello world!</h1>
    <button @click="showSignupModal = true">Sign Up</button>
    <SignupModal v-if="showSignupModal" @close="showSignupModal = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SignupModal from '../components/Signup/Signup.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    SignupModal,
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
/* Your styles here */
</style>
