import { useContext } from 'react'
import { ExpenseServiceContext } from '../providers/ExpenseServiceProvider'
import useCurrentUser from './useCurrentUser'

import { useAsync } from 'react-async-hook'

const useExpenseList = () => {
  const { user, error: userError } = useCurrentUser()
  const expenseService = useContext(ExpenseServiceContext)

  const { result, loading, error } = useAsync(async () => {
    if (!user) throw new Error('Cannot show expenses, please log in first!')
    if (userError) throw userError

    const expensesResult = await expenseService.getAll(user?.id)

    if ('errorMessage' in expensesResult) throw new Error(expensesResult.errorMessage)
    return expensesResult
  }, [user, userError])

  return { expenses: result, loading, error }
}

export default useExpenseList
