import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ExchangeRateService } from '../services/exchangeRate.service'

export const useOrderStore = defineStore('order', () => {
  const rateEuroToPound = ref<number | null>(null)
  const rateEuroToYuan = ref<number | null>(null)
  const rateYuanToEuro = ref<number | null>(null)
  const rateYuanToPound = ref<number | null>(null)

  const getExchangeRate = async () => {
    const rates = await ExchangeRateService.getRates()

    if (!rates.status) {
      return
    }

    if (rates.rateEuroToPound != null && rates.rateEuroToYuan) {
      rateEuroToYuan.value = rates.rateEuroToYuan
      rateEuroToPound.value = rates.rateEuroToPound
      rateYuanToEuro.value = parseFloat((1 / rates.rateEuroToYuan).toFixed(4))
      rateYuanToPound.value = parseFloat(
        ((1 * rates.rateEuroToPound) / rates.rateEuroToYuan).toFixed(4),
      )
    }
  }

  getExchangeRate()
  return {
    rateEuroToYuan,
    rateEuroToPound,
    rateYuanToEuro,
    rateYuanToPound,
  }
})
