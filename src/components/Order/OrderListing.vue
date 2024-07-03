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
        <button
          type="button"
          class="text-black flex items-center border-b"
          @click="toggleSort"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        >
          <span class="text-base mr-2">Sort</span>
          <ChevronDownIcon class="h-4 w-4" />
        </button>
        <Menu
          ref="sortMenu"
          id="overlay_menu"
          :model="sortItems"
          @click="handleSortBy"
          :popup="true"
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
    </div>
    <Paginator
      :rows="perPage"
      :totalRecords="totalRecords"
      :currentPage="currentPage"
      @page="onPageChange"
      class="mt-8"
    ></Paginator>
    <DataView :value="orders" class="lg:order-container">
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
                      <p>${{ item.amount }}</p>
                    </div>
                  </div>
                  <div class="hidden sm:flex">
                    <div class="mr-4">
                      <button
                        aria-label="Login"
                        type="button"
                        class="relative rounded-md bg-white p-1 text-company text-sm flex border border-company px-4 py-2"
                      >
                        View Order
                      </button>
                    </div>
                    <div>
                      <button
                        @click="downloadOrder(item.uuid)"
                        aria-label="Login"
                        type="button"
                        class="relative rounded-md bg-white p-1 text-company text-sm flex border border-company px-4 py-2"
                      >
                        Download Order
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
                        aria-label="Login"
                        type="button"
                        class="relative w-28 rounded-md bg-white p-1 text-company text-xs flex border border-company px-4 py-2 mb-2"
                      >
                        View Order
                      </button>
                      <button
                        @click="downloadOrder(item.uuid)"
                        aria-label="Login"
                        type="button"
                        class="relative w-32 rounded-md bg-white p-1 text-company text-xs flex border border-company px-4 py-2 mb-2"
                      >
                        Download Order
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
                            <p class="mt-0">${{ product.price }}</p>
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
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataView from 'primevue/dataview'
import { OrderService } from '../../services/orderService'
import {
  OrderInterface,
  OrderStatusInterface,
} from '../../util/interfaces/OrderInterface'
import dayjs from 'dayjs'
import { ChevronDownIcon, ShoppingBagIcon } from '@heroicons/vue/16/solid'
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  EllipsisVerticalIcon,
} from '@heroicons/vue/24/outline'
import { objectToQueryString } from '../../util/helper'

const formatDate = (date: Date) => {
  return dayjs(date).format('MMMM DD, YYYY')
}

const orders = ref<OrderInterface[]>([])

const totalRecords = ref(0)
const currentPage = ref(1)
const perPage = ref(10)
const openOrderProductId = ref('')
const openOrderMenuId = ref('')

const sortMenu = ref(null)
const sortBy = ref('Sort By')
const orderBy = ref('')
const sortItems = ref([
  {
    items: [
      {
        label: 'paid',
      },
      {
        label: 'pending payment',
      },
      {
        label: 'canceled',
      },
      {
        label: 'open',
      },
      {
        label: 'shipped',
      },
      {
        label: 'delivered',
      },
    ],
  },
])

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
    if (sortBy.value !== 'Sort By') {
      query['sortBy'] = sortBy.value
    }

    console.log(query)
    console.log(objectToQueryString(query))

    const data = await OrderService.getOrders(objectToQueryString(query))
    totalRecords.value = data.total
    currentPage.value = data.current_page
    perPage.value = data.per_page
    orders.value = data.data
  } catch (error) {
    console.error('Error loading orders:', error)
  }
}

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
  console.log(id)

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

const downloadOrder = async (uuid: string) => {
  try {
    const response = await OrderService.downloadOrder(uuid)

    // Create a Blob from the binary data
    const blob = new Blob([response])

    // Create a link element
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `order_${uuid}.pdf` // Set the file name

    // Append the link to the body
    document.body.appendChild(link)

    // Programmatically click the link to trigger the download
    link.click()

    // Clean up and remove the link
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading order:', error)
  }
}

const toggleSort = (event: any) => {
  if (sortMenu.value) {
    sortMenu.value.toggle(event)
  }
}

const handleSortBy = (event: any) => {
  if (sortMenu.value) {
    console.log(event.target.textContent)
  }
  sortBy.value = event.target.textContent
}

const handleOrderBy = (value: string) => {
  orderBy.value = value
  loadOrders(currentPage.value)
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
    