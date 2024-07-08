import api from './api'
export const UserService = {
  async getUser() {
    try {
      const response = await api.get(`/user`)

      return response.data.data
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  },
}
