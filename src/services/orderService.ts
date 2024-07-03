import api from './api'
export const OrderService = {
  async getOrders(page?: number) {
    try {
      const response = await api.get(`/orders?page=${page}`)
      console.log(response.data)

      return response.data
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  },
}
