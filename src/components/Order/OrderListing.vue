<template>
  <div class="card md:w-8/12 lg:w-8/12 mx-auto max-w-4xl px-2 sm:px-0">
    <div>
      <div>
        <h1 class="font-bold text-2xl">Order History</h1>
        <p class="text-gray-400 text-base">
          Check the status of recent orders, download order, and view order.
        </p>
      </div>
    </div>
    <div class="flex items-center">
      <div class="mt-4 mr-6">
        <Select
          v-model="selectedSort"
          :options="sortItems"
          optionLabel="name"
          placeholder="Sort By"
          checkmark
          :highlightOnSelect="false"
          class="w-full md:w-44 md:min-w-44 text-sm"
          @change="handleSortBy"
        />
      </div>
      <div class="mt-4">
        <button
          @click="handleOrderBy('desc')"
          :class="['p-2', orderBy === 'desc' ? 'border' : '']"
        >
          <ArrowLongDownIcon class="h-5 w-5" />
        </button>
        <button
          @click="handleOrderBy('asc')"
          :class="['p-2', orderBy === 'asc' ? 'border' : '']"
        >
          <ArrowLongUpIcon class="h-5 w-5" />
        </button>
      </div>
      <div class="mt-4 mr-6">
        <Select
          v-model="selectedCurrency"
          :options="currencies"
          optionLabel="name"
          placeholder="Select Currency"
          checkmark
          :highlightOnSelect="false"
          class="w-full md:w-44 md:min-w-44 text-sm"
        />
      </div>
    </div>
    <Paginator
      :rows="perPage"
      :totalRecords="totalRecords"
      :currentPage="currentPage"
      @page="onPageChange"
      class="mt-8"
    ></Paginator>
    <DataView :value="orders" class="order-container">
      <template #list="slotProps">
        <div class="flex flex-col mt-4">
          <div v-for="item in slotProps.items" :key="item.uuid">
            <div class="border border-1 rounded-md my-4">
              <div class="border-b py-6">
                <div class="flex justify-between px-4">
                  <div class="grid grid-cols-3 gap-5">
                    <div class="text-sm">
                      <p class="font-bold">Order No</p>
                      <p>{{ item.uuid.slice(0, 6) }}</p>
                    </div>
                    <div class="text-sm">
                      <p class="font-bold">Date placed</p>
                      <p>{{ formatDate(item.created_at) }}</p>
                    </div>
                    <div class="text-sm">
                      <p class="font-bold">Total Amount</p>
                      <p>
                        {{ selectedCurrency ? selectedCurrency.symbol : 'CNY'
                        }}{{ convertCurrency(item.amount) }}
                      </p>
                    </div>
                  </div>
                  <div class="hidden sm:flex">
                    <div class="mr-4">
                      <button
                        @click="handleSelectedOrder(item)"
                        aria-label="Login"
                        type="button"
                        class="relative rounded-md bg-white p-1 text-company text-sm flex border border-company px-4 py-2"
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                  <div class="relative sm:hidden">
                    <div>
                      <button @click="toggleOrderMenu(item.uuid)">
                        <EllipsisVerticalIcon class="h-6 w-6" />
                      </button>
                    </div>
                    <div
                      class="card grid absolute right-4 top-4"
                      v-if="openOrderMenuId === item.uuid"
                    >
                      <button
                        @click="handleSelectedOrder(item)"
                        aria-label="Login"
                        type="button"
                        class="relative w-28 rounded-md bg-white p-1 text-company text-xs flex border border-company px-4 py-2 mb-2"
                      >
                        View Order
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between mt-2 px-6">
                  <div class="flex justify-between items-center">
                    <i
                      :class="[
                        'h-8 w-8',
                        getStatusIcon(item?.order_status[0]).icon,
                      ]"
                    ></i>
                    <span
                      :class="[
                        'text-sm text-gray-400',
                        getStatusIcon(item?.order_status[0]).color,
                      ]"
                      >{{ item?.order_status[0].title }} on
                      {{ formatDate(item?.order_status[0].created_at) }}</span
                    >
                  </div>
                  <button @click="toggleOrderProduct(item.uuid)">
                    <ChevronDoubleDownIcon
                      v-if="openOrderProductId !== item.uuid"
                      class="h-6 w-6 p-1 text-company border border-company"
                    />
                    <ChevronDoubleUpIcon
                      v-if="openOrderProductId === item.uuid"
                      class="h-6 w-6 p-1 text-company border border-company"
                    />
                  </button>
                </div>
              </div>

              <div>
                <ul
                  v-show="openOrderProductId === item.uuid"
                  class="collapse-content"
                  id="order-listing"
                >
                  <li
                    v-for="product in item.products"
                    :key="product.uuid"
                    class="px-6 py-6 border-b"
                  >
                    <div>
                      <div class="flex">
                        <div class="flex-1 ml-4">
                          <div class="flex justify-between">
                            <div class="flex">
                              <ShoppingBagIcon
                                class="h-5 w-5 mr-2 text-company"
                              />
                              <span>{{ product.quantity }}</span>
                            </div>
                            <p class="mt-0">
                              {{
                                selectedCurrency
                                  ? selectedCurrency.symbol
                                  : 'CNY'
                              }}{{ convertCurrency(product.price) }}
                            </p>
                          </div>
                          <p class="block font-thin mt-2">
                            {{ product.product }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
  <order-view
    v-if="showOrderViewModal"
    @close="showOrderViewModal = false"
    :selectedOrder="selectedOrder"
    :selectedCurrency="selectedCurrency"
  />
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataView from 'primevue/dataview'
import { OrderService } from '../../services/orderService'
import {
  OrderInterface,
  OrderStatusInterface,
} from '../../util/interfaces/OrderInterface'
import { ChevronDownIcon, ShoppingBagIcon } from '@heroicons/vue/16/solid'
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  EllipsisVerticalIcon,
} from '@heroicons/vue/24/outline'
import { objectToQueryString } from '../../util/helper'
import OrderView from '../OrderView/OrderView.vue'
import printJS from 'print-js'
import { useOrderStore } from '../../store/order'
import { useCurrency } from '../../composables/useCurrency'
import { useFormatDate } from '../../composables/useFormatDate'

const orders = ref<OrderInterface[]>([])

const totalRecords = ref(0)
const currentPage = ref(1)
const perPage = ref(10)
const openOrderProductId = ref('')
const openOrderMenuId = ref('')
const orderBy = ref('')
const sortItems = ref([
  { name: 'Paid', code: 'paid' },
  { name: 'Pending payment', code: 'pending payment' },
  { name: 'Canceled', code: 'canceled' },
  { name: 'Open', code: 'open' },
  { name: 'Shipped', code: 'shipped' },
  { name: 'Delivered', code: 'delivered' },
])

const { formatDate } = useFormatDate()
const { convertAmount } = useCurrency()
interface SelectOption {
  code: string
  name: string
  symbol: string
}
const selectedSort = ref<SelectOption | null>(null)
const selectedCurrency = ref<SelectOption | null>({
  name: 'CNY',
  code: 'CNY',
  symbol: 'CNY',
})
const currencies = ref([
  { name: 'Pounds', code: 'GBP', symbol: '£' },
  { name: 'Euro', code: 'EUR', symbol: '€' },
])

const showOrderViewModal = ref(false)
const selectedOrder = ref<OrderInterface | null>(null)

const loadOrders = async (page: number) => {
  try {
    interface QueryInterface {
      desc?: string
      sortBy?: string
      page?: number
    }

    const query: QueryInterface = {}

    query.page = page

    if (orderBy.value === 'desc') {
      query.desc = 'true'
    }
    if (orderBy.value === 'asc') {
      query.desc = 'false'
    }

    if (selectedSort.value && selectedSort.value.code !== '') {
      query['sortBy'] = selectedSort.value.code
    }

    const data = await OrderService.getOrders(objectToQueryString(query))
    totalRecords.value = data.total
    currentPage.value = data.current_page
    perPage.value = data.per_page
    orders.value = data.data
  } catch (error) {
    console.error('Error loading orders:', error)
  }
}
const orderStore = useOrderStore()

onMounted(() => {
  loadOrders(currentPage.value)
})

const onPageChange = (event: any) => {
  currentPage.value = event.page + 1
  loadOrders(currentPage.value)
}
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
      return { icon: 'pi pi-trash text-red-400 pi-icon', color: 'text-red-400' }

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

const toggleOrderProduct = (id: string) => {
  if (openOrderProductId.value === id) {
    openOrderProductId.value = ''
  } else {
    openOrderProductId.value = id
  }
}

const toggleOrderMenu = (id: string) => {
  if (openOrderMenuId.value === id) {
    openOrderMenuId.value = ''
  } else {
    openOrderMenuId.value = id
  }
}

const handleSortBy = () => {
  loadOrders(currentPage.value)
}

const handleOrderBy = (value: string) => {
  orderBy.value = value
  loadOrders(currentPage.value)
}

const handleSelectedOrder = (order: OrderInterface) => {
  selectedOrder.value = order
  showOrderViewModal.value = true
}

const convertCurrency = (amount: number) => {
  if (selectedCurrency.value) {
    return convertAmount(amount, orderStore, selectedCurrency.value.code)
  } else {
    return amount
  }
}
</script>
<style scoped>
.order-container {
  height: 80svh;
  overflow: scroll;
}

.pi-icon {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}

.collapse-content {
  transition: max-height 0.2s ease-out;
  overflow: hidden;
}
</style>
    