import { useContext, useEffect, useState } from 'react'
import { AuthServiceContext } from '../providers/AuthServiceProvider'
import { ExpenseServiceContext } from '../providers/ExpenseServiceProvider'
import { ExpenseListElement } from '../services/ExpenseService'
import { Optional } from '../typeDefs'

const useExpenseList = () => {
  const authService = useContext(AuthServiceContext)
  const expenseService = useContext(ExpenseServiceContext)

  const [expenses, setExpenses] = useState<Optional<ExpenseListElement[]>>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (expenses || error.length > 0) return

    const exec = async () => {
      const userResult = await authService.getCurrentUser()

      if ('errorMessage' in userResult) {
        setError(userResult.errorMessage)
        return
      }

      const expensesResult = await expenseService.getAll(userResult.id)
      if ('errorMessage' in expensesResult) {
        setError(expensesResult.errorMessage)
        return
      }

      setExpenses(expensesResult)
    }

    setLoading(true)
    exec().then(() => setLoading(false))
  }, [])

  return { expenses, loading, error }
}

export default useExpenseList
