import axios from 'axios'

export const ExchangeRateService = {
  async getExchangeRate(
    orderAmount: number,
    currencySelected?: string,
  ): Promise<any> {
    const amount = orderAmount
    const currency = currencySelected || 'CNY' // Default to 'CNY' if no currency is selected

    try {
      const response = await axios.get(
        'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
      )

      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(response.data, 'application/xml')

      // Get all Cube elements with currency attribute
      const cubes = xmlDoc.getElementsByTagName('Cube')

      let rate: number | null = null
      let rateEuroToYuan: number | null = null

      // Loop through the Cube elements and find the one with the matching currency
      for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i]
        const currencyAttr = cube.getAttribute('currency')
        const rateAttr = cube.getAttribute('rate')

        if (currencyAttr === currency) {
          rate = parseFloat(rateAttr!)
        }

        if (currencyAttr === 'CNY') {
          rateEuroToYuan = parseFloat(rateAttr!)
        }

        if (rate && rateEuroToYuan) {
          break
        }
      }

      if (rate === null || rateEuroToYuan === null) {
        return {
          message: 'Currency not supported or not found in the ECB data.',
        }
      }

      return {
        amountInEuro: amount / rateEuroToYuan,
        currency: currency,
        converted_amount: amount * rate,
        rate: rate,
      }
    } catch (error) {
      return {
        message: 'Error fetching exchange rates.',
      }
    }
  },

  async getRates() {
    try {
      const response = await axios.get(
        'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
      )

      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(response.data, 'application/xml')

      // Get all Cube elements with currency attribute
      const cubes = xmlDoc.getElementsByTagName('Cube')

      let rateEuroToYuan: number | null = null
      let rateEuroToPound: number | null = null

      // Loop through the Cube elements and find the one with the matching currency
      for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i]
        const currencyAttr = cube.getAttribute('currency')
        const rateAttr = cube.getAttribute('rate')

        if (currencyAttr === 'GBP') {
          rateEuroToPound = parseFloat(rateAttr!)
        }

        if (currencyAttr === 'CNY') {
          rateEuroToYuan = parseFloat(rateAttr!)
        }

        if (rateEuroToPound && rateEuroToYuan) {
          break
        }
      }

      if (rateEuroToPound === null || rateEuroToYuan === null) {
        return {
          rateEuroToPound,
          rateEuroToYuan,
          status: false,
          message: 'Currency not supported or not found in the ECB data.',
        }
      }

      return {
        rateEuroToPound,
        rateEuroToYuan,
        status: true,
        message: 'Currency not supported or not found in the ECB data.',
      }
    } catch (error) {
      return {
        message: 'Error fetching exchange rates.',
      }
    }
  },
}
