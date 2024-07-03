import axios from 'axios'
import { getCookie } from '../util/cookie'
import { useAuthStore } from '../store/auth'

const api = axios.create({
  baseURL: 'https://pet-shop.buckhill.com.hr/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = getCookie('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error)
  },
)

const logoutUser = () => {
  const store = useAuthStore()
  store.logOut()
  window.location.href = '/'
}

export default api
