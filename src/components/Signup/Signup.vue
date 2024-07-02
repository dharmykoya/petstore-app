<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
    @click.self="closeSignup"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg sm:w-full sm:max-w-xl">
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
            Sign up
          </h2>
        </div>
        <div v-if="errorMessage !== ''" class="text-red-500 text-center">
          {{ errorMessage }}
        </div>
        <form class="space-y-6 mt-4" @submit.prevent="submitForm">
          <div class="flex w-full justify-between">
            <div class="">
              <label for="email" class="block text-lg leading-6 text-gray-500"
                >First Name</label
              >
              <div class="mt-2">
                <input
                  v-model="firstName"
                  id="firstName"
                  name="firstName"
                  type="text"
                  autocomplete="firstName"
                  required="true"
                  placeholder="First Name"
                  class="block w-full rounded-md border-0 py-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6 px-4"
                />
              </div>
            </div>
            <div>
              <label for="email" class="block text-lg leading-6 text-gray-500"
                >Last Name</label
              >
              <div class="mt-2">
                <input
                  v-model="lastName"
                  id="lastName"
                  name="lastName"
                  type="text"
                  autocomplete="lastName"
                  required="true"
                  placeholder="Last Name"
                  class="block w-full rounded-md border-0 py-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6 px-4"
                />
              </div>
            </div>
          </div>
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
            <label
              for="phoneNumber"
              class="block text-lg leading-6 text-gray-500"
              >Phone Number</label
            >
            <div class="mt-2">
              <input
                v-model="phoneNumber"
                id="phoneNumber"
                name="text"
                type="text"
                autocomplete="phone number"
                required="true"
                placeholder="Phone Number"
                class="block w-full rounded-md border-0 py-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6 px-4"
              />
            </div>
          </div>

          <div>
            <label for="address" class="block text-lg leading-6 text-gray-500"
              >Address</label
            >
            <div class="mt-2">
              <input
                v-model="address"
                id="address"
                name="text"
                type="text"
                autocomplete="address"
                required="true"
                placeholder="Address"
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

          <div>
            <div class="flex items-center justify-between">
              <label
                for="confirmPassword"
                class="block text-lg leading-6 text-gray-500"
                >Confirm Password</label
              >
            </div>
            <div class="mt-2">
              <input
                v-model="confirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autocomplete="current-password"
                placeholder="Confirm Password"
                required="true"
                class="block w-full rounded-md border-0 py-3 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-4"
              />
            </div>
          </div>

          <div class="flex items-center">
            <div class="mr-2">
              <input
                v-model="isMarketing"
                id="promotions"
                name="promotions"
                type="checkbox"
                class="text-2xl h-5 w-5"
              />
            </div>
            <label
              for="promotions"
              class="block text-lg mb-1 leading-6 text-gray-500"
              >I want to receive inspiration, marketing promotions and updates
              via email.</label
            >
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-company px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              SIGN UP
            </button>
          </div>

          <div class="flex items-center justify-center">
            <div class="text-sm">
              <button class="text-blue-500" @click="openLogin">
                Already have an account? Login
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

const showLoginModal = ref(false)
const firstName = ref('')
const lastName = ref('')
const address = ref('')
const phoneNumber = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isMarketing = ref('')
const errorMessage = ref('')

const emit = defineEmits(['openLoginModal', 'close', 'signupData'])

const openLogin = () => {
  showLoginModal.value = true
  emit('openLoginModal', true)
}

const closeSignup = () => {
  showLoginModal.value = true
  emit('close', true)
  return
}

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePhoneNumber = (phoneNumber: string) => {
  const re = /^\d{10}$/ // Simple validation for a 10-digit phone number
  return re.test(phoneNumber)
}

const submitForm = () => {
  // Clear previous error message
  errorMessage.value = ''

  // Basic validation for required fields
  if (
    !firstName.value ||
    !lastName.value ||
    !address.value ||
    !phoneNumber.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    errorMessage.value = 'Please, fill in all required fields'
    return
  }

  // Email format validation
  if (!validateEmail(email.value)) {
    errorMessage.value = 'Please, enter a valid email address'
    return
  }

  // Phone number format validation
  if (!validatePhoneNumber(phoneNumber.value)) {
    errorMessage.value = 'Please, enter a valid phone number'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Passwords too short, minimum of 8 chars'
    return
  }

  // Password and confirm password match validation
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  errorMessage.value = ''

  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    phoneNumber: phoneNumber.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    isMarketing: isMarketing.value,
  }

  // Emit the form data to the parent component
  emit('signupData', formData)

  // Close the signup modal
  closeSignup()
}
</script>

<style scoped>
/* Add your styles here */
</style>
