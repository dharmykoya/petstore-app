import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { setCookie, getCookie, removeCookie } from '../util/cookie'
import { UserService } from '../services/auth.service'

// Define the user interface
 interface User {
  uuid: string
  firstName: string
  lastName: string
  address: string
  avatar: string
  phoneNumber: string
  email: string
  isAdmin: boolean
  isMarketing: boolean
  updatedAt: Date | null
  createdAt: Date | null
}

export interface LoginResponse {
  uuid: string
  first_name: string
  last_name: string
  address: string
  avatar: string
  phone_number: string
  email: string
  isMarketing: boolean
  is_admin?: boolean
  updatedAt: Date | null
  createdAt: Date | null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User>({
    uuid: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    isAdmin: false,
    email: '',
    avatar: '',
    isMarketing: false,
    updatedAt: null,
    createdAt: null,
  })

  // Initialize token from local storage
  const initializeToken = async () => {
    const localStorageToken = getCookie('token')

    if (localStorageToken) {
      const authUser: LoginResponse = await UserService.getUser()
      setUser(authUser)
      token.value = localStorageToken
    }
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    setCookie('token', newToken, 7)
  }

  const logOut = () => {
    token.value = ''
    removeCookie('token')
    window.location.href = '/'
  }

  const setUser = (userResponse: LoginResponse) => {
    user.value.uuid = userResponse.uuid
    user.value.firstName = userResponse.first_name
    user.value.lastName = userResponse.last_name
    user.value.address = userResponse.address
    user.value.avatar = userResponse.avatar
    user.value.phoneNumber = userResponse.phone_number
    user.value.email = userResponse.email
    user.value.isMarketing = userResponse.isMarketing
    user.value.updatedAt = userResponse.updatedAt
    user.value.createdAt = userResponse.createdAt
    user.value.isAdmin = !!userResponse.is_admin
  }

  const isAuth = computed(() => token.value !== null)
  const isAdmin = computed(() => !!user.value.isAdmin)

  initializeToken()
  return {
    token,
    setToken,
    isAuth,
    user,
    setUser,
    logOut,
    isAdmin,
  }
})
