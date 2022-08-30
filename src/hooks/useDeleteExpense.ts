import { useMutation } from '@apollo/client'
import { DeleteExpenseDocument } from '../graphql/generated'

const useDeleteExpense = () => {
  const [deleteExpenseMutation] = useMutation(DeleteExpenseDocument)

  return {
    deleteExpense: deleteExpenseMutation,
  }
}

export default useDeleteExpense
