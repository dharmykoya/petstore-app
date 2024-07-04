<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
    @click.self="closeOrderView"
  >
    <div class="bg-white px-6 rounded-lg shadow-lg sm:w-full sm:max-w-4xl pb-2">
      <div
        class="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl bg-white border rounded-md"
      >
        <div class="flex justify-between border-b px-4 py-3">
          <div class="flex items-center">
            <h1 class="font-bold text-lg">Order Details</h1>
            <p class="text-sm text-gray-600 mx-3">-</p>
            <p class="text-sm text-gray-500">
              {{ formatDate(selectedOrder.created_at) }}
            </p>
            <p class="text-sm text-gray-600 mx-3">-</p>
            <p class="text-sm text-gray-500">
              {{ selectedOrder.products.length }} Products
            </p>
          </div>
          <div class="hidden sm:flex">
            <div class="mr-4">
              <button
                @click="downloadOrder"
                aria-label="Login"
                type="button"
                class="relative rounded-md bg-white p-1 text-company text-sm flex border border-company px-4 py-2"
              >
                Download Order
              </button>
            </div>
            <div>
              <button
                @click="closeOrderView"
                aria-label="Login"
                type="button"
                class="relative rounded-md bg-white p-1 text-company text-sm flex border border-company px-4 py-2"
              >
                Back
              </button>
            </div>
          </div>
        </div>
        <div class="px-4">
          <div class="grid grid-cols-3 border my-4 rounded-md">
            <div>
              <div class="text-sm font-semibold text-gray-500 border-b p-2.5">
                CUSTOMER DETAILS
              </div>
              <div class="p-2.5">
                <p class="text-base text-gray-700">
                  {{ store.user.firstName }}
                  {{ store.user.lastName }}
                </p>
                <p class="my-2 text-sm text-gray-500">
                  {{ store.user.address }}
                </p>
                <div class="mb-2">
                  <p class="text-xs text-gray-500">EMAIL</p>
                  <p class="text-sm text-gray-700">
                    {{ store.user.email }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">PHONE</p>
                  <p class="text-sm text-gray-700">
                    {{ store.user.phoneNumber }}
                  </p>
                </div>
              </div>
            </div>
            <div class="border-l border-r">
              <div class="text-sm font-semibold text-gray-500 border-b p-2.5">
                SHIPPING DETAILS
              </div>
              <div class="p-2.5">
                <p class="text-base text-gray-700">
                  {{ selectedOrder.user.first_name }}
                  {{ selectedOrder.user.last_name }}
                </p>
                <p class="my-2 text-sm text-gray-500">
                  {{ selectedOrder.address.shipping }}
                </p>
                <div class="mb-2">
                  <p class="text-xs text-gray-500">EMAIL</p>
                  <p class="text-sm text-gray-700">
                    {{ selectedOrder.user.email }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">PHONE</p>
                  <p class="text-sm text-gray-700">
                    {{ selectedOrder.user.phone_number }}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="text-sm font-semibold text-gray-500 border-b p-2.5">
                PAYMENT SUMMARY
              </div>
              <div class="p-2.5">
                <div class="flex justify-between mb-3">
                  <p class="text-sm text-gray-500">Payment Type</p>
                  <p class="text-sm text-gray-700">
                    {{ selectedOrder.payment?.type || 'Unpaid' }}
                  </p>
                </div>
                <div class="flex justify-between mb-3">
                  <p class="text-sm text-gray-500">Billing Name</p>
                  <p class="text-sm text-gray-700">
                    {{ selectedOrder.payment?.details.name || 'N/A' }}
                  </p>
                </div>
                <div class="mb-2">
                  <p class="text-xs text-gray-500">Billing Address</p>
                  <p class="text-xs text-gray-700">
                    {{ selectedOrder.address.billing }}
                  </p>
                </div>
                <div class="flex justify-between mb-3">
                  <p class="text-sm text-gray-500">Delivery Fee</p>
                  <p class="text-sm text-gray-700">
                    CNY {{ selectedOrder.delivery_fee.toFixed(2) }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="text-sm text-gray-500">Total (CNY)</p>
                  <p class="text-sm text-gray-700 font-bold">
                    ¥ {{ selectedOrder.amount.toFixed(2) }}
                  </p>
                </div>
                <div
                  class="flex justify-between"
                  v-if="selectedCurrency.code != 'CNY'"
                >
                  <p class="text-sm text-gray-500">
                    Total ({{ selectedCurrency.code }})
                  </p>
                  <p class="text-sm text-gray-700 font-bold">
                    {{ selectedCurrency.symbol
                    }}{{ convertCurrency(selectedOrder.amount.toFixed(2)) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4">
          <div class="border px-3 py-4 grid grid-cols-4">
            <div>
              <p class="text-xs text-gray-500">ORDER ID:</p>
              <p class="text-sm text-gray-700">
                {{ selectedOrder.uuid }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500">PRODUCT NO:</p>
              <p class="text-sm text-gray-700">
                {{ selectedOrder.products.length }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500">ORDER CREATED:</p>
              <p class="text-sm text-gray-700">
                {{ formatDate(selectedOrder.created_at) }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500">SHIPPED AT:</p>
              <p class="text-sm text-gray-700">
                {{ formatDate(selectedOrder.shipped_at) || 'N/A' }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="flex px-4 py-4 border-b">
            <p class="mr-2 text-sm text-gray-400">ORDER STATUS:</p>
            <p
              :class="[
                'text-sm font-bold mr-2',
                getStatusIcon(selectedOrder?.order_status[0]).color,
              ]"
            >
              {{ selectedOrder.order_status[0].title.toUpperCase() }}
            </p>
            <p class="text-sm">
              on
              <span class="font-bold text-gray-700">{{
                formatDate(selectedOrder.order_status[0].created_at)
              }}</span>
            </p>
          </div>
        </div>

        <div class="h-80 overflow-scroll mt-2 mb-2">
          <h3 class="px-4 font-bold">Products</h3>
          <DataTable
            :value="selectedOrder.products"
            tableStyle="min-width: 50rem"
            class="text-xs fixed-header"
          >
            <Column field="uuid" header="ID"></Column>
            <Column field="product" header="Name"></Column>
            <Column field="price" header="Price"></Column>
            <Column field="quantity" header="Quantity"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>

  <!-- PDF version -->
  <div
    class="mt-10 sm:mx-auto sm:w-full sm:max-w-4xl bg-white border rounded-md"
    id="downloadOrder"
  >
    <div class="flex justify-between border-b px-4 py-3">
      <div class="">
        <h1 class="font-bold text-lg">Order Details</h1>
        <span class="text-sm text-gray-500">
          {{ formatDate(selectedOrder.created_at) }}
        </span>
        -
        <span class="text-sm text-gray-500">
          {{ selectedOrder.products.length }} Products
        </span>
      </div>
    </div>
    <div class="px-4">
      <table class="border my-4 rounded-md w-full table-bordered">
        <thead>
          <tr class="text-left">
            <th
              class="text-sm font-semibold text-left text-gray-500 border-b p-2.5"
            >
              CUSTOMER DETAILS
            </th>
            <th
              class="text-sm font-semibold text-left text-gray-500 border-b border-l border-r p-2.5"
            >
              SHIPPING DETAILS
            </th>
            <th
              class="text-sm font-semibold text-left text-gray-500 border-b p-2.5"
            >
              PAYMENT SUMMARY
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-l border-r p-2.5 w-4/12">
              <p class="text-base text-gray-700">
                {{ store.user.firstName }}
                {{ store.user.lastName }}
              </p>
              <p class="my-2 text-sm text-gray-500">
                {{ store.user.address }}
              </p>
              <p class="text-xs text-gray-500">
                EMAIL:
                <strong class="font-bold text-gray-700">{{
                  store.user.email
                }}</strong>
              </p>
              <p class="text-xs text-gray-500">
                PHONE:
                <strong class="font-bold text-gray-700">{{
                  store.user.phoneNumber
                }}</strong>
              </p>
            </td>

            <td class="border-l border-r p-2.5 w-4/12">
              <p class="text-base text-gray-700">
                {{ selectedOrder.user.first_name }}
                {{ selectedOrder.user.last_name }}
              </p>
              <p class="my-2 text-sm text-gray-500">
                {{ selectedOrder.address.shipping }}
              </p>

              <p class="text-xs text-gray-500">
                EMAIL:
                <strong class="font-bold text-gray-700">{{
                  selectedOrder.user.email
                }}</strong>
              </p>

              <p class="text-xs text-gray-500">
                PHONE:
                <strong class="font-bold text-gray-700">{{
                  selectedOrder.user.phone_number
                }}</strong>
              </p>
            </td>
            <td class="border-l border-r p-2.5 w-4/12">
              <p class="text-xs text-gray-500">
                PAYMENT TYPE:
                <strong class="font-bold text-gray-700">{{
                  selectedOrder.payment?.type || 'Unpaid'
                }}</strong>
              </p>

              <p class="text-xs text-gray-500">
                BILLING NAME:
                <strong class="font-bold text-gray-700">{{
                  selectedOrder.payment?.details.name || 'N/A'
                }}</strong>
              </p>

              <p class="text-xs text-gray-500">
                BILLING ADDRESS:
                <strong class="font-bold text-gray-700">{{
                  selectedOrder.address.billing
                }}</strong>
              </p>

              <p class="text-xs text-gray-500">
                DELIVERY FEE:
                <strong class="font-bold text-gray-700"
                  >CNY {{ selectedOrder.delivery_fee.toFixed(2) }}</strong
                >
              </p>
              <p class="text-xs text-gray-500">
                TOTAL (CNY):
                <strong class="font-bold text-gray-700"
                  >¥ {{ selectedOrder.amount.toFixed(2) }}</strong
                >
              </p>
              <p
                class="text-xs text-gray-500"
                v-if="selectedCurrency.code != 'CNY'"
              >
                TOTAL ({{ selectedCurrency.code }}):
                <strong class="font-bold text-gray-700"
                  >{{ selectedCurrency.symbol
                  }}{{
                    convertCurrency(selectedOrder.amount.toFixed(2))
                  }}</strong
                >
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="h-28"></div>
    <div class="px-4" style="margin-top: 100px">
      <table class="border px-3 py-4 w-full">
        <tr>
          <td class="text-xs text-gray-500 text-left">
            <div class="mb-2">
              <p class="text-xs text-gray-500">
                ORDER ID:
                <strong class="font-bold text-gray-700">{{
                  selectedOrder.uuid
                }}</strong>
              </p>
            </div>
          </td>
          <td class="text-xs text-gray-500 text-left">
            <div class="mb-2">
              <p class="text-xs text-gray-500">
                NUMBER of PRODUCTS:
                <strong class="font-bold text-gray-700">{{
                  selectedOrder.products.length
                }}</strong>
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-xs text-gray-500 text-left">
            <div class="mb-2">
              <p class="text-xs text-gray-500">
                ORDER CREATED:
                <strong class="font-bold text-gray-700">{{
                  formatDate(selectedOrder.created_at)
                }}</strong>
              </p>
            </div>
          </td>
          <td class="text-xs text-gray-500 text-left">
            <div class="mb-2">
              <p class="text-xs text-gray-500">
                SHIPPED AT:
                <strong class="font-bold text-gray-700">{{
                  formatDate(selectedOrder.shipped_at) || 'N/A'
                }}</strong>
              </p>
            </div>
          </td>
        </tr>
      </table>
      <div class="h-5"></div>
      <div class="mb-2">
        <p class="text-xs text-gray-500">
          ORDER STATUS:
          <strong class="font-bold text-gray-700">{{
            selectedOrder.order_status[0].title.toUpperCase()
          }}</strong>
          <strong>
            on
            <span class="font-bold text-gray-700">{{
              formatDate(selectedOrder.order_status[0].created_at)
            }}</span></strong
          >
        </p>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="h-80 overflow-scroll mt-2 mb-2">
      <h3 class="px-4 font-bold">Products</h3>
      <DataTable
        :value="selectedOrder.products"
        tableStyle="min-width: 50rem"
        class="text-xs fixed-header"
      >
        <Column field="uuid" header="ID"></Column>
        <Column field="product" header="Name"></Column>
        <Column field="price" header="Price(CNY)"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  </div>
</template>
    
  <script setup lang="ts">
import { useFormatDate } from '../../composables/useFormatDate'
import { useGetOrderStatus } from '../../composables/useGetOrderStatus'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import printJS from 'print-js'
import { useAuthStore } from '../../store/auth'
import { useCurrency } from '../../composables/useCurrency'
import { useOrderStore } from '../../store/order'

const emit = defineEmits(['close'])
const store = useAuthStore()
const orderStore = useOrderStore()

const closeOrderView = () => {
  emit('close', true)
  return
}

const { formatDate } = useFormatDate()
const { getStatusIcon } = useGetOrderStatus()
const { convertAmount } = useCurrency()

const props = defineProps({
  selectedOrder: {
    type: Object,
    required: true,
  },
  selectedCurrency: {
    type: Object,
    required: true,
  },
})

const downloadOrder = async () => {
  try {
    printJS('downloadOrder', 'html')
  } catch (error) {
    console.error('Error downloading order:', error)
  }
}

const convertCurrency = (amount: number) => {
  if (props.selectedCurrency) {
    return convertAmount(amount, orderStore, props.selectedCurrency.code)
  } else {
    return amount
  }
}
</script>
<style scoped>
.fixed-header {
  overflow-y: auto;
  max-height: 400px;
}

.fixed-header thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
}
</style>
    