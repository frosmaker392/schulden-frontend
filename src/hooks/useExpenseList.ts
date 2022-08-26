import { useContext, useState } from 'react'
import { useAsync, useAsyncCallback } from 'react-async-hook'
import { ExpenseServiceContext } from '../providers/ExpenseServiceProvider'
import { ExpenseListElement } from '../services/ExpenseService'
import useCurrentUser from './useCurrentUser'

const useExpenseList = () => {
  const { user } = useCurrentUser()
  const expenseService = useContext(ExpenseServiceContext)

  const [expenses, setExpenses] = useState<ExpenseListElement[]>()

  const fetchAndSet = useAsyncCallback(async () => {
    if (!user) throw new Error('Cannot fetch expenses, please log in!')

    const result = await expenseService.getAll(user.id)
    if ('errorMessage' in result) throw new Error(result.errorMessage)

    setExpenses(result)
  })

  useAsync(fetchAndSet.execute, [user])

  return {
    expenses,
    isLoading: fetchAndSet.loading,
    error: fetchAndSet.error,
    refresh: fetchAndSet.execute,
  }
}

export default useExpenseList
