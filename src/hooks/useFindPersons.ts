import { useContext } from 'react'
import { ExpenseServiceContext } from '../providers/ExpenseServiceProvider'

import { useAsync } from 'react-async-hook'

const useFindPersons = (name: string) => {
  const expenseService = useContext(ExpenseServiceContext)

  const { result, loading, error } = useAsync(async () => {
    const result = await expenseService.findPersons(name)
    if ('errorMessage' in result) throw new Error(result.errorMessage)
    return result
  }, [name])

  return { persons: result, loading, error }
}

export default useFindPersons
