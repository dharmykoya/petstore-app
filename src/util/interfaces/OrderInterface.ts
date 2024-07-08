import { LoginResponse } from "@/store/auth"

export interface OrderInterface {
  uuid: string
  code: string
  name: string
  description: string
  image: string
  price: number
  category: string
  quantity: number
  inventoryStatus: string
  rating: number
  products: ProductInterface[]
  order_status: OrderStatusInterface[],
  created_at: Date,
  shipped_at: Date,
  amount: number,
  delivery_fee: number,
  address: {billing: string, shipping: string},
  payment: PaymentInterface,
  user: LoginResponse,
}


interface PaymentInterface {
  details: {name: string}
  type: string
}
export interface ProductInterface {
  uuid: string
  product: string
  price: number
  quantity: number
}

export interface OrderStatusInterface {
  uuid: string
  created_at: Date
  title: string
  updated_at: Date
}

export interface PaginatedResponse {
  data: OrderInterface[]
  total: string
  next_page_url?: string
  current_page: string
  per_page: string
}
