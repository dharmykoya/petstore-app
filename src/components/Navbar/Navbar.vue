<template>
  <Disclosure as="nav" class="bg-company" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            aria-label="Open main menu"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-company hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
          <div class="flex items-center">
            <!-- Logo -->
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Petstore logo"
            />
          </div>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex items-center">
            <!-- Logo -->
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center"
        >
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4 items-center">
              <!-- Products Dropdown -->
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                    aria-label="Products"
                    class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-6 py-2 text-md text-white text-transform: uppercase hover:bg-company-700"
                  >
                    Products
                    <ChevronDownIcon
                      class="-mr-1 h-6 w-5 text-white"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="py-1">
                      <MenuItem
                        v-slot="{ active }"
                        v-for="item in products"
                        :key="item.name"
                        :href="item.href"
                      >
                        <a
                          :class="[
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm',
                          ]"
                        >
                          {{ item.name }}
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>

              <!-- Regular Navigation Links -->
              <div v-for="item in navigation" :key="item.name">
                <a
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-white hover:bg-company-700',
                    'rounded-md px-6 py-2 text-md cursor-pointer text-transform: uppercase',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                >
                  {{ item.name }}
                </a>
              </div>
              <div v-if="isAuth">
                <a
                  v-for="item in authNavigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-white hover:bg-company-700',
                    'rounded-md px-6 py-2 text-md cursor-pointer text-transform: uppercase',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                >
                  {{ item.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <button
              aria-label="View cart"
              type="button"
              class="relative rounded-sm bg-company p-1 text-white flex border border-white px-6 py-3 mr-6"
            >
              <ShoppingCartIcon class="h-6 w-6 mr-2" aria-hidden="true" />
              CART (0)
            </button>
            <button
              v-if="!isAuth"
              @click="showLoginModal = true"
              aria-label="Login"
              type="button"
              class="relative rounded-sm bg-company p-1 text-white flex border border-white px-6 py-2.5"
            >
              LOGIN
            </button>
            <button
              v-if="isAuth"
              @click="handleLogout"
              aria-label="Login"
              type="button"
              class="relative rounded-sm bg-company p-1 text-white flex border border-white px-6 py-2.5"
            >
              LOGOUT
            </button>
            <!-- Profile dropdown -->
            <div v-if="isAuth">
              <div
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-2"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only"></span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Panel -->
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <!-- Products Dropdown -->
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              aria-label="Products"
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-2 py-2 text-base text-white text-transform: uppercase hover:bg-company-700"
            >
              Products
              <ChevronDownIcon
                class="-mr-1 h-6 w-5 text-white"
                aria-hidden="true"
              />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <MenuItem
                  v-slot="{ active }"
                  v-for="item in products"
                  :key="item.name"
                  :href="item.href"
                >
                  <a
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]"
                  >
                    {{ item.name }}
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md text-base px-2 py-2 text-white text-transform: uppercase',
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </DisclosureButton>
        <button
          aria-label="View cart"
          type="button"
          class="relative rounded-sm bg-company p-1 text-white flex border border-white px-6 py-3 mr-6"
        >
          <ShoppingCartIcon class="h-6 w-6 mr-2" aria-hidden="true" />
          CART (0)
        </button>
        <button
          v-if="!isAuth"
          @click="showLoginModal = true"
          aria-label="Login"
          type="button"
          class="relative rounded-sm bg-company p-1 text-white flex border border-white px-6 py-2.5"
        >
          LOGIN
        </button>
        <button
          v-if="isAuth"
          @click="handleLogout"
          aria-label="Login"
          type="button"
          class="relative rounded-sm bg-company p-1 text-white flex border border-white px-6 py-2.5"
        >
          LOGOUT
        </button>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <LoginModal
    v-if="showLoginModal"
    @close="handleLoginModalError"
    @openSignupModal="handleSignupModal"
    @loginData="handleLogin"
    :authError="authError"
  />
  <SignupModal
    v-if="showSignupModal"
    @close="handleSignupModalError"
    @openLoginModal="handleLoginModal"
    @signupData="handleSignup"
    :authError="authError"
    :signupErrors="signupErrors"
  />
</template>

<script lang="ts" setup>
import axios from 'axios'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { ShoppingCartIcon, ChevronDownIcon } from '@heroicons/vue/16/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref, computed } from 'vue'
import LoginModal from '../Login/Login.vue'
import SignupModal from '../Register/Signup.vue'
import { useAuthStore } from '../../store/auth'

interface NavigationItem {
  name: string
  href: string
  current: boolean
}

interface ProductItem {
  name: string
  href: string
}

const navigation: NavigationItem[] = [
  { name: 'Promotions', href: '#promotions', current: false },
  { name: 'Blog', href: '#blog', current: false },
]
const authNavigation: NavigationItem[] = [
  { name: 'Orders', href: '/orders', current: false },
]

const products: ProductItem[] = [
  { name: 'Shoes', href: '#shoes' },
  { name: 'Bags', href: '#bags' },
  { name: 'Men', href: '#men' },
  { name: 'Women', href: '#women' },
]

const emit = defineEmits(['openLoginModal'])
const showLoginModal = ref(false)
const showSignupModal = ref(false)
const authError = ref('')
const signupErrors = ref({})

const handleSignupModal = (value: boolean) => {
  showSignupModal.value = value
  showLoginModal.value = false
}

const handleLoginModal = (value: boolean) => {
  showSignupModal.value = false
  showLoginModal.value = value
}

const store = useAuthStore()

const handleLogin = async (formData: {
  email: string
  password: string
  remember: boolean
}) => {
  try {
    const response = await axios.post(
      'https://pet-shop.buckhill.com.hr/api/v1/user/login',
      formData
    )
    store.setToken(response.data.data.token)
  } catch (error: any) {
    authError.value = 'Email/Password Incorrect'
  }
  handleLoginModalError()
}

const handleSignup = async (formData: {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  email: string
  password: string
  confirmPassword: string
  isMarketing: boolean
}) => {
  signupErrors.value = {}
  try {
    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      address: formData.address,
      phone_number: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      is_marketing: formData.isMarketing,
    }

    const response = await axios.post(
      'https://pet-shop.buckhill.com.hr/api/v1/user/create',
      data
    )
    store.setToken(response.data.data.token)
    store.setUser(response.data.data)
  } catch (error: any) {
    if (error.response.status == 422) {
      formatErrors(error.response?.data)
      return
    }
    authError.value = 'Something went wrong, please contact admin'
  }

  handleSignupModalError()
}

const handleLogout = () => {
  store.logOut()
}

const isAuth = computed(() => store.isAuth)

const handleLoginModalError = () => {
  if (authError.value) {
    showLoginModal.value = true
    return
  }
  showLoginModal.value = false
}

const handleSignupModalError = () => {
  if (authError.value) {
    showSignupModal.value = true
    return
  }
  signupErrors.value = {}
  showSignupModal.value = false
}

interface ErrorObject {
  errors: {
    [key: string]: string[]
  }
}

const formatErrors = (errorObj: ErrorObject): string => {
  const formattedErrors: string[] = []
  const formattedErrorsObj: { [key: string]: string } = {}

  Object.keys(errorObj.errors).forEach((field) => {
    errorObj.errors[field].forEach((error) => {
      formattedErrors.push(`${field}: ${error}`)
      formattedErrorsObj[field] = error
    })
  })
  signupErrors.value = formattedErrorsObj

  return formattedErrors.join('\n')
}
</script>

<style scoped></style>
