export * from './FormUtils'
export * from './TestUtils'

export const toFormattedCurrency = (amount: number): string =>
  Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Math.abs(amount))
