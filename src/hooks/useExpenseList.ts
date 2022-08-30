import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { GetAllExpensesDocument } from '../graphql/generated'
import { ExpenseListElement } from '../typeDefs'
import { toExpenseListElement } from '../utils'
import useCurrentUser from './useCurrentUser'

const useExpenseList = () => {
  const { user } = useCurrentUser()
  const { data, loading, error, refetch } = useQuery(GetAllExpensesDocument)

  const expenses: ExpenseListElement[] = useMemo(
    () => toExpenseListElement(user?.id, data?.getAllExpenses),
    [data, user],
  )

  return {
    expenses,
    loading,
    error,
    refresh: refetch,
  }
}

export default useExpenseList
