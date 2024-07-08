import { OrderStatusInterface } from '../util/interfaces/OrderInterface'

export const useGetOrderStatus = () => {
  const getStatusIcon = (orderStatus: OrderStatusInterface) => {
    switch (orderStatus.title.toLowerCase()) {
      case 'pending payment':
      case 'open':
        return {
          icon: 'pi pi-folder-open text-orange-400 pi-icon',
          color: 'text-orange-400',
        }

      case 'paid':
        return {
          icon: 'pi pi-money-bill text-blue-400 pi-icon',
          color: 'text-blue-400',
        }

      case 'cancelled':
      case 'canceled':
        return {
          icon: 'pi pi-trash text-red-400 pi-icon',
          color: 'text-red-400',
        }

      case 'shipped':
      case 'delivered':
        return {
          icon: 'pi pi-check-circle text-green-400 pi-icon',
          color: 'text-green-400',
        }

      default:
        return {
          icon: 'pi pi-question-circle text-black-400 pi-icon',
          color: 'text-black-400',
        }
    }
  }

  const getStatusName = (orderStatus: OrderStatusInterface) => {
    switch (orderStatus.title.toLowerCase()) {
      case 'pending payment':
        return 'Pending Payment'

      case 'open':
        return 'Open'

      case 'paid':
        return 'Paid'

      case 'cancelled':
      case 'canceled':
        return 'Cancelled'

      case 'shipped':
        return 'Shipped'

      case 'delivered':
        return 'Delivered'

      default:
        return 'N/A'
    }
  }

  return { getStatusIcon, getStatusName }
}
