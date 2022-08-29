import { Optional, Person, SplitMethod } from '../typeDefs'

export * from './FormUtils'

export const toFormattedCurrency = (amount: number): string =>
  Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)

export const calculateSplit = (
  totalAmount: number,
  splitMethod: SplitMethod,
  persons: Person[],
  amounts: Optional<number>[],
) => {
  if (splitMethod === 'equal') {
    const amountPerPerson = Math.floor((totalAmount * 100) / persons.length) / 100
    const floatingCents = Math.round((totalAmount - amountPerPerson * persons.length) * 100)

    return {
      debtors: persons.map((p, i) => {
        const cent = i < floatingCents ? 0.01 : 0

        return {
          person: p,
          amount: amountPerPerson + cent,
        }
      }),
      rest: 0,
    }
  }

  const rest = amounts.reduce((acc: number, amount) => acc - (amount ?? 0), totalAmount)
  return {
    debtors: persons.map((p, i) => ({
      person: p,
      amount: amounts.at(i) ?? 0,
    })),
    rest,
  }
}
