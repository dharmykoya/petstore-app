<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
    @click.self="closeLogin"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg sm:w-full sm:max-w-lg">
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-white py-6 px-12">
        <div class="">
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=600"
            alt="Your Company"
          />
          <h2
            class="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900"
          >
            Log In
          </h2>
        </div>
        <div v-if="errorMessage !== ''" class="text-red-500 text-center">
          {{ errorMessage }}
        </div>
        <form class="space-y-6 mt-4" @submit.prevent="submitForm">
          <div>
            <label for="email" class="block text-lg leading-6 text-gray-500"
              >Email</label
            >
            <div class="mt-2">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required="true"
                placeholder="Email"
                class="block w-full rounded-md border-0 py-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6 px-4"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-lg leading-6 text-gray-500"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="Password"
                required="true"
                class="block w-full rounded-md border-0 py-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-4"
              />
            </div>
          </div>

          <div class="flex items-center">
            <div class="mr-2">
              <input
                v-model="remember"
                id="promotions"
                name="promotions"
                type="checkbox"
                class="text-2xl h-5 w-5"
              />
            </div>
            <label
              for="promotions"
              class="block text-lg mb-1 leading-6 text-gray-500"
              >Remember me</label
            >
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-company px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              LOG IN
            </button>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a href="#" class="text-blue-500">Forgot password?</a>
            </div>
            <div class="text-sm">
              <button class="text-blue-500" @click="toggleModals">
                Don't have an account? Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../store/auth'

const showSignupModal = ref(false)
const email = ref('')
const password = ref('')
const remember = ref(false)
const errorMessage = ref('')

const emit = defineEmits(['openSignupModal', 'close', 'loginData'])

const toggleModals = () => {
  showSignupModal.value = true
  emit('openSignupModal', true)
}

const closeLogin = () => {
  showSignupModal.value = true
  emit('close', true)
  return
}

const submitForm = () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please, fill in the form correctly'
    return
  }
  const formData = {
    email: email.value,
    password: password.value,
    remember: remember.value,
  }
  emit('loginData', formData)
  closeLogin()
}

const authStore = useAuthStore()

console.log(authStore)
</script>

<style scoped>
</style>
  