export * from './FormUtils'

export const toFormattedCurrency = (amount: number): string =>
  Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
