<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div
      class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
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
        <form class="space-y-6 mt-4" action="#" method="POST">
          <div class="flex w-full justify-between">
            <div class="">
              <label for="email" class="block text-lg leading-6 text-gray-500"
                >First Name</label
              >
              <div class="mt-2">
                <input
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
              <a href="#" class="text-blue-500"
                >Already have an account? Login</a
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Add your styles here */
</style>
