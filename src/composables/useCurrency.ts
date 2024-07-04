interface ExchangeRates {
  rateEuroToPound: number | null
  rateEuroToYuan: number | null
  rateYuanToEuro: number | null
  rateYuanToPound: number | null
}

export const useCurrency = () => {
  const convertAmount = (
    amount: number,
    rates: ExchangeRates,
    selectedCurrency?: string | null,
  ) => {
    if (selectedCurrency) {
      if (selectedCurrency === 'GBP' && rates.rateYuanToPound) {
        return (amount * rates.rateYuanToPound).toFixed(2)
      } else if (selectedCurrency === 'EUR' && rates.rateYuanToPound) {
        return (amount * rates.rateYuanToPound).toFixed(2)
      } else {
        return amount
      }
    } else {
      return amount
    }
  }

  return { convertAmount }
}
