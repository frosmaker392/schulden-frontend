import { ExpenseListElement, Optional, Person, SplitMethod } from '../typeDefs'

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

interface ExpenseWithoutPersonName {
  id: string
  name: string
  timestamp: string
  totalAmount: number
  payer: {
    id: string
  }
  debtors: {
    person: {
      id: string
    }
    amount: number
  }[]
}

export const toExpenseListElement = (
  userId?: string,
  expenses?: ExpenseWithoutPersonName[],
): ExpenseListElement[] => {
  if (!userId || !expenses) return []

  return expenses.map((expense) => {
    let outstandingAmount = 0
    if (expense.payer.id === userId) {
      for (const debtor of expense.debtors) {
        if (debtor.person.id === userId) continue

        outstandingAmount += debtor.amount
      }
    } else {
      const matchingDebtor = expense.debtors.find((debtor) => debtor.person.id === userId)
      outstandingAmount -= matchingDebtor?.amount ?? 0
    }

    return {
      id: expense.id,
      name: expense.name,
      timestamp: expense.timestamp,
      outstandingAmount,
    }
  })
}
