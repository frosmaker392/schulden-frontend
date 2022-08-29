import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { GetAllExpensesDocument } from '../graphql/generated'
import { ExpenseListElement } from '../typeDefs'
import useCurrentUser from './useCurrentUser'

const useExpenseList = () => {
  const { user } = useCurrentUser()
  const { data, loading, error, refetch } = useQuery(GetAllExpensesDocument)

  const expenses: ExpenseListElement[] = useMemo(() => {
    if (!user || !data) return []

    return data.getAllExpenses.map((expense) => {
      let outstandingAmount = 0
      if (expense.payer.id === user.id) {
        for (const debtor of expense.debtors) {
          if (debtor.person.id === user.id) continue

          outstandingAmount += debtor.amount
        }
      } else {
        const matchingDebtor = expense.debtors.find((debtor) => debtor.person.id === user.id)
        outstandingAmount -= matchingDebtor?.amount ?? 0
      }

      return {
        id: expense.id,
        name: expense.name,
        timestamp: expense.timestamp,
        outstandingAmount,
      }
    })
  }, [data, user])

  return {
    expenses,
    loading,
    error,
    refresh: refetch,
  }
}

export default useExpenseList
