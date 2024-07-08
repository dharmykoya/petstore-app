import api from './api'
export const OrderService = {
  async getOrders(query: string) {
    try {
      const response = await api.get(`/orders${query}`)

      return response.data
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  },

  async downloadOrder(uuid: string) {
    try {
      const response = await api.get(`order/${uuid}/download`, {
        responseType: 'blob',
      })

      return response.data
    } catch (error) {
      console.error('Error downloading order:', error)
      throw error
    }
  },
}
